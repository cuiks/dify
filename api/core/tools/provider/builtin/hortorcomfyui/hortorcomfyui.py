from typing import Any

from core.tools.errors import ToolProviderCredentialValidationError
from core.tools.provider.builtin.hortorcomfyui.tools.comfyui import ComfyuiTool
from core.tools.provider.builtin_tool_provider import BuiltinToolProviderController


class HortorComfyuiProvider(BuiltinToolProviderController):
    def _validate_credentials(self, credentials: dict[str, Any]) -> None:
        try:
            ComfyuiTool().fork_tool_runtime(
                runtime={
                    "credentials": credentials,
                }
            ).invoke(
                user_id='',
                tool_parameters={
                    "prompt": "demon",
                    "negative_prompt": ""
                },
            )
        except Exception as e:
            raise ToolProviderCredentialValidationError(str(e))
