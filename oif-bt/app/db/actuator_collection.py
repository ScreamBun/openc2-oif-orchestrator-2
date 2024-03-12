import pydantic
from db.database import actuator_collection
from bson import ObjectId 


pydantic.json.ENCODERS_BY_TYPE[ObjectId]=str


async def get_actuator_by_id(id: str):
    if id != 'undefined':
      actuator = await actuator_collection.find_one({"_id": ObjectId(id)})
      if actuator:
        return to_actuator(actuator)
    return None


async def get_actuators():
    n = await actuator_collection.count_documents({})
    cursor = actuator_collection.find()
    cursor.sort('name', 1) 
    actuators = await cursor.to_list(length=n)
    if actuators:
        return to_actuator_list(actuators)
    return None


async def add_actuator(new_actuator: dict):
    actuator_dbo = await actuator_collection.insert_one(new_actuator)
    new_actuator = await actuator_collection.find_one({"_id": actuator_dbo.inserted_id})
    return to_actuator(new_actuator)


async def update_actuator(id: str, data: dict):
    if len(data) < 1:
        return False
    
    actuator_dbo = await actuator_collection.find_one({"_id": ObjectId(id)})
    if actuator_dbo:
        actuator_updated = await actuator_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if actuator_updated:
            return True
        return False


async def delete_actuator(id: str):
    actuator = await actuator_collection.find_one({"_id": ObjectId(id)})
    if actuator:
        await actuator_collection.delete_one({"_id": ObjectId(id)})
        return True
    else:
        return False
    

def to_actuator(item) -> dict:
    return {
        "id": str(item.get("_id")),
        "actuator_id": str(item.get("actuator_id")),
        "name": item.get("name"),
        "device_id": item.get("device_id"),
        "profile_type": item.get("profile_type"),
        "actuator_schema": item.get("actuator_schema"),
        "created_at": item.get("created_at"),
        "updated_at": item.get("updated_at")
    }    


def to_actuator_list(items) -> list:
    return [to_actuator(item) for item in items]