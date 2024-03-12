import toml
import tomli
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from transports.mqtt.mqtt_manager import MqttManager
from middlewares import request_handler
from models.common import ResponseModel
from exceptions import BaseError
from routes.main_api import router as api_router

print("oif-bt starting...")

print("load configs")
with open("./app/config.toml", mode="rb") as fp:
    configs = tomli.load(fp)
print(configs)
# print(configs["MQTT"]["BROKER"])

mqttMngr = MqttManager()
print("mqtt manager running...")

app = FastAPI(title='oif-bt')
app.middleware("http")(request_handler)

origins = ["http://localhost:8000", "http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

@app.exception_handler(BaseError)
async def error_handler(request: Request, exc: BaseError):
    response = ResponseModel("", exc.status_code, exc.message, True)
    return JSONResponse(content=response, status_code=exc.status_code)    

@app.get("/")
async def root():
    return {"message": "Hello welcome to the OIF-BT"}    

print("oif-bt running...")

if __name__ == '__main__':
    uvicorn.run("main:app", host='127.0.0.1', port=8000, log_level="info", reload=True)
    print("oif-bt running...")

    mqttMngr = MqttManager()
    print("mqtt manager running...")

