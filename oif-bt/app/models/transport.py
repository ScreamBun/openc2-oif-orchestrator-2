from pydantic import BaseModel, Field
from models.auth import AuthModel

class TransportModel(BaseModel):
    transport_id: str = Field(None, title="User defined Transport ID", max_length=250)
    host: str = Field(None, title="Transport Host Name", max_length=250)
    port: int = Field(title="Transport Host Port")
    protocol: str = Field(None, title="Transfer Protocol", max_length=10)
    pub_sub: bool = Field(None, title="Is Publish and Subscribe")
    serialization: set[str] = set()
    auth: AuthModel 
    prefix: str = Field(None, title="MQTT Queue or Topic Prefix", max_length=120)
    responseTopic: str = Field(None, title="MQTT Response Topic", max_length=120)
    broadcastTopic: str = Field(None, title="MQTT Broadcast Topic", max_length=120)
    deviceTopic: str = Field(None, title="Device MQTT Topic", max_length=120)
    profileTopic: str = Field(None, title="Profile MQTT Topic", max_length=120)
    resourceType: str = Field(None, title="Transfer Type", max_length=120)
