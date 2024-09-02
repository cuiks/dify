from datetime import datetime

import pytz
from flask_restful import Resource, fields, marshal_with, reqparse

from controllers.service_api import api
from controllers.service_api.wraps import validate_app_token
from models.model import App
from extensions.ext_database import db


class UsageApi(Resource):
    """Resource for app usage."""

    parameters_fields = {
        "start": fields.String,
        "end": fields.String,
        "tz": fields.String,
    }

    @validate_app_token
    def get(self, app_model: App):
        """Retrieve app usage."""

        parser = reqparse.RequestParser()
        parser.add_argument("start", required=True, type=str, location="args")
        parser.add_argument("end", type=str, required=True, location="args")
        parser.add_argument("tz", type=str, required=True, default=20, location="args")
        args = parser.parse_args()

        sql_query = """
                        SELECT date(DATE_TRUNC('day', created_at AT TIME ZONE 'UTC' AT TIME ZONE :tz )) AS date, 
                            sum(messages.message_tokens) AS msg_tokens, sum(messages.answer_tokens) AS ans_tokens, 
                            sum(total_price) AS total_price 
                            FROM messages where app_id = :app_id 
                        """
        arg_dict = {"tz": args["tz"], "app_id": app_model.id}

        timezone = pytz.timezone(args["tz"])
        utc_timezone = pytz.utc

        if args["start"]:
            start_datetime = datetime.strptime(args["start"], "%Y-%m-%d %H:%M")
            start_datetime = start_datetime.replace(second=0)

            start_datetime_timezone = timezone.localize(start_datetime)
            start_datetime_utc = start_datetime_timezone.astimezone(utc_timezone)

            sql_query += " and created_at >= :start"
            arg_dict["start"] = start_datetime_utc

        if args["end"]:
            end_datetime = datetime.strptime(args["end"], "%Y-%m-%d %H:%M")
            end_datetime = end_datetime.replace(second=0)

            end_datetime_timezone = timezone.localize(end_datetime)
            end_datetime_utc = end_datetime_timezone.astimezone(utc_timezone)

            sql_query += " and created_at < :end"
            arg_dict["end"] = end_datetime_utc

        sql_query += " GROUP BY date order by date"

        response_data = []

        with db.engine.begin() as conn:
            rs = conn.execute(db.text(sql_query), arg_dict)
            for i in rs:
                response_data.append(
                    {
                        "date": str(i.date), "msg_tokens": i.msg_tokens, "ans_tokens": i.ans_tokens,
                        "total_price": float(i.total_price), "currency": "USD"
                    }
                )

        return {"result": "success", "data": response_data}


api.add_resource(UsageApi, "/usage")
