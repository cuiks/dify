import random
from typing import Any, Union

import requests

from core.tools.entities.tool_entities import ToolInvokeMessage
from core.tools.tool.builtin_tool import BuiltinTool


class ComfyuiTool(BuiltinTool):
    def _invoke(self,
                user_id: str,
                tool_parameters: dict[str, Any],
                ) -> Union[ToolInvokeMessage, list[ToolInvokeMessage]]:
        """
            invoke tools
        """
        base_url = self.runtime.credentials.get('base_url', "")
        if base_url == "":
            return self.create_text_message('Please input base_url')
        model = tool_parameters.get('model', '')
        if not model:
            return self.create_text_message('Please select model')
        prompt = tool_parameters.get('prompt', '')
        if not prompt:
            return self.create_text_message('Please input prompt')
        negative_prompt = tool_parameters.get('negative_prompt', '')

        response = requests.post(base_url, json={
            "version": model,
            "param": {
                "prompt": prompt,
                "negative_prompt": negative_prompt
            }
        })
        if response.status_code != 200:
            raise Exception('Request failed')
        if response.json().get("meta", {}).get("errCode", -1) != 0:
            raise Exception(response.json().get("meta", {}).get("errMsg", 'Request failed'))

        result = []

        for image in response.json().get("data", {}).get("list", []):
            result.append(self.create_image_message(image=image))

        return result

    @staticmethod
    def _generate_random_id(length=8):
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        random_id = ''.join(random.choices(characters, k=length))
        return random_id
