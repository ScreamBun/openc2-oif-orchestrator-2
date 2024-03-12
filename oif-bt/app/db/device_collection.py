from fastapi.encoders import jsonable_encoder
import pydantic
from db.database import device_collection
from bson import ObjectId 


pydantic.json.ENCODERS_BY_TYPE[ObjectId]=str


async def get_device_by_id(id: str):
    device = await device_collection.find_one({"_id": ObjectId(id)})
    if device:
        return to_device(device)
    return None


async def get_devices():
    n = await device_collection.count_documents({})
    cursor = device_collection.find()
    cursor.sort('name', 1) 
    devices = await cursor.to_list(length=n)
    if devices:
        return to_device_list(devices)
    return None


async def add_device(new_device: dict):
    device_dbo = await device_collection.insert_one(new_device)
    new_device = await device_collection.find_one({"_id": device_dbo.inserted_id})
    return to_device(new_device)


async def update_device(id: str, data: dict):
    if len(data) < 1:
        return False
    
    device_dbo = await device_collection.find_one({"_id": ObjectId(id)})
    if device_dbo:
        device_updated = await device_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if device_updated:
            return True
        return False


async def delete_device(id: str):
    device = await device_collection.find_one({"_id": ObjectId(id)})
    if device:
        await device_collection.delete_one({"_id": ObjectId(id)})
        return True
    else:
        return False
    

def to_device(item) -> dict:
    return {
        "id": str(item.get("_id")),
        "device_id": str(item.get("device_id")),
        "name": item.get("name"),
        "note": item.get("note"),
        "transport": item.get("transport"),
        "created_at": item.get("created_at"),
        "updated_at": item.get("updated_at")
    }    


def to_device_list(items) -> list:
    return [to_device(item) for item in items]