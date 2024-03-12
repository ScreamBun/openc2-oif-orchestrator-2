from typing import Optional
from pydantic import BaseModel, Field
import datetime
from models.transport import TransportModel
from models.py_object_id import PyObjectId

class DeviceModel(BaseModel):
    device_id : str = Field(..., title="User defined Device ID", max_length=250)
    name: str = Field(..., title="Name", max_length=250)
    transport: TransportModel | None = None
    note: str = Field(None, title="Note", max_length=500)

    def as_dict(self):
        return {"device_id": self.device_id,
                "name": self.name,
                "transport": self.transport,
                "note": self.note,
                "created_at": datetime.datetime.now()}
    
class DeviceUpdateModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    device_id : str = Field(None, title="User defined Device ID", max_length=250)
    name: str = Field(None, title="Name", max_length=250)
    transport: TransportModel | None = None
    note: Optional[str] = Field(None, title="Note", max_length=500)    

    def as_dict(self):
        return {
                "id": self.id,
                "device_id": self.device_id,
                "name": self.name,
                "transport": self.transport,
                "note": self.note,
                "updated_at": datetime.datetime.now()
                }  

