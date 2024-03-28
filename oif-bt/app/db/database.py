# driver for mongodb
import motor.motor_asyncio

MONGODB_URL = "mongodb://localhost:37017"
DATABASE_NAME = "oif-db"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URL)
database = client[DATABASE_NAME]

actuator_collection = database.get_collection("actuator")
command_collection = database.get_collection("command")
device_collection = database.get_collection("device")
message_collection = database.get_collection("message")
serialization_collection = database.get_collection("serialization")
transfer_protocol_collection = database.get_collection("transfer_protocol")
