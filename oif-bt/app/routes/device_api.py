from typing import Annotated, List, Optional
from fastapi import APIRouter, File, UploadFile
from fastapi.encoders import jsonable_encoder
from models.common import ResponseModel
from exceptions import BaseError
from db import device_collection
from logic import device_manager, const

from models.device import DeviceModel, DeviceUpdateModel

router = APIRouter(
    prefix="/devices",
    tags=["Device"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_description="Get all Device data from the database")
async def get_devices_data():
    device_list = await device_collection.get_devices()
    return ResponseModel(device_list, 200, "", False)


@router.get("/{device_id}")
async def read_device_data(device_id: str):
    device = None
    response = ""
    
    if device_id == None or device_id == 'undefined':
        response = "Device not found, create new"
    else:
        device = await device_collection.get_device_by_id(device_id)
        response = "Device found"
        
    return ResponseModel(device, 200, response, False)


@router.post("/add", response_description="Device data added into the database")
async def add_device_data(device: DeviceModel):
    device = device.as_dict()
    device_encoded = jsonable_encoder(device)
    new_device = await device_collection.add_device(device_encoded)
    return ResponseModel(new_device, 200, "Device added successfully.", False)


@router.put("/{device_id}/update")
async def update_device_data(device: DeviceUpdateModel):
    device = device.as_dict()
    id = str(device["id"])
    device_encoded = jsonable_encoder(device)
    updated_device = await device_collection.update_device(id, device_encoded)
    return ResponseModel(updated_device, 200, "Device updated successfully.", False)


@router.delete("/{device_id}/delete")
async def delete_device_data(device_id: str):
    deleted_result = await device_collection.delete_device(device_id)
    return ResponseModel(deleted_result, 200, "Device deleted successfully.", False)


@router.post("/cacert_upload/{device_id}")
async def cacert_upload(device_id: str, ca_cert: Optional[UploadFile] = None):
    await device_manager.store_cert_file(device_id, const.CA_CERT, ca_cert)

    return {"message": f"cacert updated"}


@router.post("/clientcert_upload/{device_id}")
async def cacert_upload(device_id: str, client_cert: Optional[UploadFile] = None):
    await device_manager.store_cert_file(device_id, const.CLIENT_CERT, client_cert)

    return {"message": f"clientcert updated"}


@router.post("/clientkey_upload/{device_id}")
async def cacert_upload(device_id: str, client_key: Optional[UploadFile] = None):
    await device_manager.store_cert_file(device_id, const.CLIENT_KEY, client_key)

    return {"message": f"clientkey updated"}


@router.post("/clientcert_upload/{device_id}")
async def clientcert_upload(device_id: str, file: Optional[UploadFile] = None):
    await device_manager.store_cert_file(device_id, const.CLIENT_CERT, file)

    return {"message": f"clientcert processed"}


@router.post("/clientkey_upload/{device_id}")
async def clientcert_upload(device_id: str, file: Optional[UploadFile] = None):
    await device_manager.store_cert_file(device_id, const.CLIENT_KEY, file)

    return {"message": f"clientkey processed"}
