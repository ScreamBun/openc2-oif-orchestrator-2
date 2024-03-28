from typing import Any
from bson import ObjectId
from pydantic import BaseModel, Field
from models.py_object_id import PyObjectId

class MessageModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    request_id : str = Field(None,  title="request_id", max_length=120)
    date_sent : str = Field(None,  title="sent date in millis", max_length=120)
    date_received : str = Field(None,  title="received date in millis", max_length=120)
    date_created : str = Field(None,  title="created date in millis", max_length=120)
    created_by : str = Field(None,  title="created by whom", max_length=120)
    msg : str = Field(None, title="command sent", max_length=10000)
    msg_type : str = Field(None, title="message type (Command, Response, Relay, Unknown)", max_length=10)

    def as_dict(self):
        return {    
                    "id": self.id,
                    "request_id": self.request_id,
                    "date_sent": self.date_sent,
                    "date_received": self.date_received,
                    "date_created": self.date_created,
                    "created_by": self.created_by,
                    "msg": self.msg,
                    "msg_type": self.msg_type
                }
        
    class Config:
        json_encoders = {
            ObjectId: str
        }
        arbitrary_types_allowed = True  