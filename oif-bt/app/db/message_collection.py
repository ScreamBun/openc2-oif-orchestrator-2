import pydantic
from db.database import message_collection
from bson import ObjectId 


pydantic.json.ENCODERS_BY_TYPE[ObjectId]=str


async def get_message(id: str):
    if id != 'undefined':
      msg = await message_collection.find_one({"_id": ObjectId(id)})
      if msg:
        return to_message(msg)
    return None


async def get_messages():
    n = await message_collection.count_documents({})
    cursor = message_collection.find()
    cursor.sort('date_created', 1) 
    messages = await cursor.to_list(length=n)
    if messages:
        return to_message_list(messages)
    return []


async def get_message_by_created_by(created_by: str):
    if created_by:
      msg = await message_collection.find_one({"created_by": created_by})
      if msg:
        return to_message(msg)
    return None


async def get_messages_by_request_id(request_id: str):
    n = await message_collection.count_documents({})
    cursor = message_collection.find({"request_id": request_id})
    cursor.sort('date_created', 1) 
    messages = await cursor.to_list(length=n)
    if messages:
        return to_message_list(messages)
    return []


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
        "request_id": str(item.get("request_id")),
        "date_sent": str(item.get("date_sent")),
        "date_received": item.get("date_received"),
        "date_created": item.get("date_created"),
        "created_by": item.get("created_by"),
        "color_indicator": item.get("color_indicator"),
        "msg": item.get("msg"),
        "msg_type": item.get("msg_type")
    }    


def to_message_list(items) -> list:
    return [to_message(item) for item in items]