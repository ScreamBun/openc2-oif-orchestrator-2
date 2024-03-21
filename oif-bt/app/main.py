import toml
import tomli
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from middlewares import request_handler
from models.common import ResponseModel
from exceptions import BaseError
from routes.main_api import router as api_router
from transports.mqtt import mqtt_manager

print("oif-bt starting...")

print("load configs")
with open("./oif-bt/app/config.toml", mode="rb") as fp:
    configs = tomli.load(fp)
print(configs)

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

if __name__ == '__main__':
    
    # print("mqtt manager starting...")
    # mqtt_manager.set_user_pw()  # Needed for AWS and MQHIV Brokers
    # mqtt_manager.connect_to_broker()
    # mqtt_manager.subscribe_to_topics()
    # mqtt_manager.client.loop_start()   
    # print("mqtt manager running...")
    
    print("uvcorn starting...")
    uvicorn.run("main:app", host='127.0.0.1', port=8000, log_level="info", reload=True)
    print("uvcorn running...")

    # mqttMngr = MqttManager()
    
print("oif-bt running...")    

