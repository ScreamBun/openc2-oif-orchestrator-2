import pydantic
from db.database import message_collection
from bson import ObjectId 


pydantic.json.ENCODERS_BY_TYPE[ObjectId]=str


async def get_message(id: str):
    if id != 'undefined':
      cmd = await message_collection.find_one({"_id": ObjectId(id)})
      if cmd:
        return to_message(cmd)
    return None


async def get_messages():
    n = await message_collection.count_documents({})
    cursor = message_collection.find()
    cursor.sort('date_sent', 1) 
    messages = await cursor.to_list(length=n)
    if messages:
        return to_message_list(messages)
    return None


async def add_message(new_message: dict):
    message_dbo = await message_collection.insert_one(new_message)
    new_message = await message_collection.find_one({"_id": message_dbo.inserted_id})
    return to_message(new_message)


async def update_message(id: str, data: dict):
    if len(data) < 1:
        return False
    
    message_dbo = await message_collection.find_one({"_id": ObjectId(id)})
    if message_dbo:
        message_updated = await message_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if message_updated:
            return True
        return False


async def delete_message(id: str):
    message = await message_collection.find_one({"_id": ObjectId(id)})
    if message:
        await message_collection.delete_one({"_id": ObjectId(id)})
        return True
    else:
        return False
    

def to_message(item) -> dict:
    return {
        "id": str(item.get("_id")),
        "date_sent": str(item.get("date_sent")),
        "date_received": item.get("date_received"),
        "status": item.get("status"),
        "msg": item.get("msg")
    }    


def to_message_list(items) -> list:
    return [to_message(item) for item in items]