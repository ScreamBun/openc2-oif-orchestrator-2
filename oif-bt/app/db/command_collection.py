import pydantic
from db.database import command_collection
from bson import ObjectId 


pydantic.json.ENCODERS_BY_TYPE[ObjectId]=str


async def get_command(id: str):
    if id != 'undefined':
      cmd = await command_collection.find_one({"_id": ObjectId(id)})
      if cmd:
        return to_command(cmd)
    return None


async def get_commands():
    n = await command_collection.count_documents({})
    cursor = command_collection.find()
    cursor.sort('sent_date', 1) 
    commands = await cursor.to_list(length=n)
    if commands:
        return to_command_list(commands)
    return None


async def add_command(new_command: dict):
    command_dbo = await command_collection.insert_one(new_command)
    new_command = await command_collection.find_one({"_id": command_dbo.inserted_id})
    return to_command(new_command)


async def update_command(id: str, data: dict):
    if len(data) < 1:
        return False
    
    command_dbo = await command_collection.find_one({"_id": ObjectId(id)})
    if command_dbo:
        command_updated = await command_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if command_updated:
            return True
        return False


async def delete_command(id: str):
    command = await command_collection.find_one({"_id": ObjectId(id)})
    if command:
        await command_collection.delete_one({"_id": ObjectId(id)})
        return True
    else:
        return False
    

def to_command(item) -> dict:
    return {
        "id": str(item.get("_id")),
        "sent_date": str(item.get("sent_date")),
        "actuator_id": item.get("actuator_id"),
        "command": item.get("command"),
        "status": item.get("status")
    }    


def to_command_list(items) -> list:
    return [to_command(item) for item in items]