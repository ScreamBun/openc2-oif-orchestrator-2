import datetime
from typing import Any
from pydantic import BaseModel, Field, Json

from models.py_object_id import PyObjectId


class ActuatorModel(BaseModel):
    actuator_id : str = Field(..., title="Actuator ID", max_length=250)
    name : str = Field(..., title="Actuator name", max_length=250)
    device_id : str = Field(None, title="Device Linked to the Actuator", max_length=120)
    profile_type : str = Field(None, title="Type of Actuator Profile", max_length=120)
    actuator_schema : str = Field(None, title="Actuator's Schema")

    def as_dict(self):
        return {"actuator_id": self.actuator_id,
                "name": self.name,
                "device_id": self.device_id,
                "profile_type": self.profile_type,
                "actuator_schema": self.actuator_schema,
                "created_at": datetime.datetime.now()}
    
class ActuatorUpdateModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    actuator_id : str = Field(..., title="Actuator ID", max_length=250)
    name : str = Field(..., title="Actuator name", max_length=250)
    device_id : str = Field(None, title="Device Linked to the Actuator", max_length=120)
    profile_type : str = Field(None, title="Type of Actuator Profile", max_length=120)
    actuator_schema : str = Field(None, title="Actuator's Schema")

    def as_dict(self):
        return {
                "id": self.id,
                "actuator_id": self.actuator_id,
                "name": self.name,
                "device_id": self.device_id,
                "profile_type": self.profile_type,
                "actuator_schema": self.actuator_schema,
                "updated_at": datetime.datetime.now()
                }    