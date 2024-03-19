import datetime
from typing import Any
from pydantic import BaseModel, Field, Json

from models.py_object_id import PyObjectId


class CommandModel(BaseModel):
    id : str = Field(..., title="command ID", max_length=250)
    sent_date : str = Field(...,  title="sent date", max_length=250)
    actuator_id : str = Field(None, title="actuator id", max_length=120)
    command : str = Field(None, title="command sent", max_length=5000)
    status : str = Field(None, title="status of command")

    def as_dict(self):
        return {"id": self.id,
                "sent_date": self.sent_date,
                "actuator_id": self.actuator_id,
                "command": self.command,
                "status": self.status}  