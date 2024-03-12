from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from models.common import ResponseModel
from db.actuator_collection import add_actuator, delete_actuator, get_actuators, get_actuator_by_id, update_actuator

from models.actuator import ActuatorModel, ActuatorUpdateModel

router = APIRouter(
    prefix="/actuators",
    tags=["Actuator"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_description="Get all Actuator data from the database")
async def get_actuators_data():
    actuator_list = await get_actuators()
    return ResponseModel(actuator_list, 200, "", False)


@router.get("/{actuator_id}")
async def read_actuator_data(actuator_id: str):
    actuator = await get_actuator_by_id(actuator_id)
    return ResponseModel(actuator, 200, "Actuator retrieved successfully.", False)


@router.post("/add", response_description="Actuator data added into the database")
async def add_actuator_data(actuator: ActuatorModel):
    actuator = actuator.as_dict()
    actuator_encoded = jsonable_encoder(actuator)
    new_actuator = await add_actuator(actuator_encoded)
    return ResponseModel(new_actuator, 200, "Actuator added successfully.", False)


@router.put("/update")
async def update_actuator_data(actuator: ActuatorUpdateModel):
    actuator = actuator.as_dict()
    actuator_encoded = jsonable_encoder(actuator)
    updated_actuator = await update_actuator(actuator.get("id"), actuator_encoded)
    return ResponseModel(updated_actuator, 200, "Actuator updated successfully.", False)


@router.delete("/{actuator_id}/delete")
async def delete_actuator_data(actuator_id: str):
    deleted_result = await delete_actuator(actuator_id)
    return ResponseModel(deleted_result, 200, "Actuator deleted successfully.", False)
