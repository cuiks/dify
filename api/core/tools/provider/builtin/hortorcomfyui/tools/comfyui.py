import random
from typing import Any, Union

import requests

from core.tools.entities.tool_entities import ToolInvokeMessage, ToolParameter
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

        print("tool_parameters: " * 10)
        print(tool_parameters)
        print(self.variables)

        img_url = ""
        if model in ["sqxly_img2img"]:
            image_id = tool_parameters.get('image_id', '')
            if not image_id:
                return self.create_text_message('Please input image id')

            image_binary = self.get_variable_file(self.VARIABLE_KEY.IMAGE)
            if not image_binary:
                return self.create_text_message('Image not found, please request user to generate image firstly.')

            # 二进制image_binary, 上传到 http://background.hortorgames.com/background/v1/file/upload
            response = requests.post('https://background.hortorgames.com/background/v1/file/upload', files={
                'filecontent': image_binary
            })
            if response.status_code != 200:
                raise Exception('Request failed')
            if response.json().get("meta", {}).get("errCode", -1) != 0:
                raise Exception(response.json().get("meta", {}).get("errMsg", 'Request failed'))
            img_url = response.json().get("data", "")

        response = requests.post(base_url, json={
            "version": model,
            "param": {
                "prompt": prompt,
                "negative_prompt": negative_prompt,
                "image": img_url
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

    def get_runtime_parameters(self) -> list[ToolParameter]:
        """
        override the runtime parameters
        """
        images = [
            ToolParameter.get_simple_instance(
                name='image_id',
                llm_description=f'the image id that you want to hortor image, \
                    and the image id should be specified in \
                        {[i.name for i in self.list_default_image_variables()]}',
                type=ToolParameter.ToolParameterType.SELECT,
                required=True,
                options=[i.name for i in self.list_default_image_variables()]
            )
        ]
        print("images: " * 100)
        print(images)
        return images
