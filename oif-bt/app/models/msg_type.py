from enum import Enum


class Msg_Type(Enum):
    COMMAND = "Command"
    RESPONSE = "Response"
    RELAY = "Relay"
    UNKNOWN = "Unknown"