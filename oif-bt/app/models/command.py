from typing import Annotated, Any, Optional
from bson import ObjectId
from pydantic import BaseModel, Field, Json

# PyObjectId = Annotated[str, BeforeValidator(str)]

class CommandModel(BaseModel):
    id: Optional[ObjectId] = Field(alias='_id')
    date_created : str = Field(None,  title="date created in millis", max_length=120)
    request_id : str = Field(None, title="request id", max_length=120)
    command : str = Field(None, title="command sent", max_length=5000)

    def as_dict(self):
        return {"id": self.id,
                "date_created": self.date_created,
                "request_id": self.request_id,
                "command": self.command
                }
        
    class Config:
        json_encoders = {
            ObjectId: str
        }
        arbitrary_types_allowed = True