from pydantic import BaseModel


class AuthModel(BaseModel):
    password: bool
    ca_cert: bool
    client_cert: bool
    client_key: bool