import replicate
import os

from config import token, media_path
class genYOLO:

    def __init__(self, token):
        self.token = token

    def gen(self, img, out_name, tags):
        try:
            token = 'r8_DBJgiJdgfqQniVITRuhNXeROIeI8XrM4UabAQ'
            clietn = replicate.Client(api_token=token)
            input = {
                "input_media": open(f'{media_path}input/{img}', 'rb'),
                'class_names': tags
            }

            output = clietn.run(
                "zsxkib/yolo-world:07aee09fc38bc4459409caa872ea416717712f4e6e875f8751a0d0d5bbea902f",
                input=input
            )
            # Проверка существования директории
            if not os.path.exists(media_path):
                os.makedirs(media_path)


            print(type(output), output)
            with open(f"{media_path}{out_name}.png", "wb") as file:
                file.write(output.read())

            print(f"File successfully written: {media_path + out_name}.png")
            return {'file_path': f"{media_path}{out_name}.png"}
        except Exception as e:
            print(f"Error during generation: {e}")
            raise
