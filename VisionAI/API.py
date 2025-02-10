import traceback
from fastapi import FastAPI, HTTPException, Response, File, UploadFile, Form
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import time
import hashlib
from threading import Thread
from Yologen import genYOLO
from config import token, media_path
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],  
    allow_headers=["*"],

)

class Bank:
    def __init__(self):
        self.obj = {}

    def set_status(self, task_id, status):
        self.obj[task_id] = {'status': status, 'thread': None}

    def get_status(self, task_id):
        return self.obj.get(task_id, {}).get('status', 'unknown')

bank = Bank()



class CommonYoloRequest(BaseModel):
    ident: str

def generate_unique_code():
    current_time = time.time()
    time_str = str(current_time)
    unique_code = hashlib.md5(time_str.encode()).hexdigest()
    return unique_code


local_path = f"{media_path}input/"
# Проверка существования директории
if not os.path.exists(local_path):
    os.makedirs(local_path, exist_ok=True)
# Подключение статических файлов
app.mount("/file", StaticFiles(directory=local_path), name="file")

@app.post("/api/generate_yolo")
async def upload_files(tags: str = Form(...), image: UploadFile = File(...)):
    id = generate_unique_code()

    if not os.path.exists(f'{local_path}/{id}/'):
        os.makedirs(f'{local_path}/{id}/', exist_ok=True)

    image_file = f'{id}/{image.filename}'

    # Сохранение изображения
    with open(f'{local_path}/{image_file}', "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    generator = genYOLO(token)

    bank.set_status(id, 'running')
    try:
        def generation_task():
            try:
                # Здесь вы можете использовать `text` в процессе генерации
                result = generator.gen(img=image_file, out_name=f"gen{id}", tags=tags)
                if result['file_path']:
                    bank.set_status(id, 'completed')
                else:
                    bank.set_status(id, 'failed')
            except Exception as e:
                bank.set_status(id, 'failed')
                print(f"Ошибка: {e}")

        x = Thread(target=generation_task)
        bank.obj[id]['thread'] = x
        x.start()
        return {'gen_id': id}
    except Exception as e:
        return {'activate': False, 'error': str(traceback.format_exc())}


@app.get("/api/status/{gen_id}")
def check_status(gen_id: str):
    status = bank.get_status(gen_id)
    return {'status': status}


# Create a Pydantic model for the request body
class YOLORequest(BaseModel):
    ident: str

@app.post("/api/commonYOLO")
async def get_instances(request: YOLORequest):
    try:
        file_path = os.path.join(media_path, f"gen{request.ident}.png")

        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail='File not found.')

        return {"url": f"/YOLO/gen{request.ident}.png"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Add new static files mount for YOLO directory
app.mount("/YOLO", StaticFiles(directory=media_path), name="yolo")


if __name__ == '__main__':
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)


