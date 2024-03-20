from typing import Annotated, Any, Optional
from bson import ObjectId
from pydantic import BaseModel, Field, Json

# PyObjectId = Annotated[str, BeforeValidator(str)]

class CommandModel(BaseModel):
    id: Optional[ObjectId] = Field(alias='_id')
    sent_date : str = Field(None,  title="sent date in millis", max_length=120)
    actuator_id : str = Field(None, title="actuator id", max_length=120)
    command : str = Field(None, title="command sent", max_length=5000)
    status : str = Field(None, title="status of command", max_length=10)

    def as_dict(self):
        return {"id": self.id,
                "sent_date": self.sent_date,
                "actuator_id": self.actuator_id,
                "command": self.command,
                "status": self.status}
        
    class Config:
        json_encoders = {
            ObjectId: str
        }
        arbitrary_types_allowed = True