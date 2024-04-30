from pydantic import BaseModel, Field
import datetime
from models.py_object_id import PyObjectId


class MqttModel(BaseModel):
    broker: str | None = None
    port: str | None = None
    pub_topics: list[str] = []
    sub_topics: list[str] = []
    username: str | None = None
    password: str | None = None

class HttpModel(BaseModel):
    host: str | None = None
    port: str | None = None
    api_endpoint: str | None = None
    username: str | None = None
    password: str | None = None
    ca_cert: str | None = None
    client_cert: str | None = None
    client_key: str | None = None 
    
class TransportModel(BaseModel):
    protocol: str | None = None
    serialization: str | None = None
    http: HttpModel | None = None
    mqtt: MqttModel | None = None

class DeviceModel(BaseModel):
    device_id : str = Field(..., title="User defined Device ID", max_length=250)
    name: str = Field(..., title="Name", max_length=250)
    transport: TransportModel | None = None

    def as_dict(self):
        return {"device_id": self.device_id,
                "name": self.name,
                "transport": self.transport,
                "created_at": datetime.datetime.now()}
    
class DeviceUpdateModel(BaseModel):
    # id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    id : str
    device_id : str = Field(None, title="User defined Device ID", max_length=250)
    name: str = Field(None, title="Name", max_length=250)
    transport: TransportModel | None = None 

    def as_dict(self):
        return {
                "id": self.id,
                "device_id": self.device_id,
                "name": self.name,
                "transport": self.transport,
                "updated_at": datetime.datetime.now()
                }  

