from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from models.common import ResponseModel
from exceptions import BaseError
from db.device_collection import add_device, delete_device, get_devices, get_device_by_id, update_device

from models.device import DeviceModel, DeviceUpdateModel

router = APIRouter(
    prefix="/devices",
    tags=["Device"],
    responses={404: {"description": "Not found"}},
)


@router.get("/known_exception", response_description="Get all Device data from the database")
async def get_exception():
    try:
        z = 1 / 0
    except ZeroDivisionError:
        raise BaseError(message="Zero Division Error", status_code=501)
    return ResponseModel("okay...", 200, "")


@router.get("/unknown_exception", response_description="Get all Device data from the database")
async def get_exception():
    z = 1 / 0
    return ResponseModel("okay...", 200, "")


@router.get("/", response_description="Get all Device data from the database")
async def get_devices_data():
    device_list = await get_devices()
    return ResponseModel(device_list, 200, "", False)


@router.get("/{device_id}")
async def read_device_data(device_id: str):
    device = await get_device_by_id(device_id)
    return ResponseModel(device, 200, "Device retrieved successfully.", False)


@router.post("/add", response_description="Device data added into the database")
async def add_device_data(device: DeviceModel):
    device = device.as_dict()
    device_encoded = jsonable_encoder(device)
    new_device = await add_device(device_encoded)
    return ResponseModel(new_device, 200, "Device added successfully.", False)


@router.put("/update")
async def update_device_data(device: DeviceUpdateModel):
    device = device.as_dict()
    device_encoded = jsonable_encoder(device)
    updated_device = await update_device(device.get("id"), device_encoded)
    return ResponseModel(updated_device, 200, "Device updated successfully.", False)


@router.delete("/{device_id}/delete")
async def delete_device_data(device_id: str):
    deleted_result = await delete_device(device_id)
    return ResponseModel(deleted_result, 200, "Device deleted successfully.", False)
