from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from models.common import ResponseModel
from db.command_collection import delete_command, get_command, update_command

from transports import mqtt
from models.command import CommandModel
from logic.command_manager import process_command

router = APIRouter(
    prefix="/command",
    tags=["Command"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_description="Get all commands sent from the database")
async def get_commands():
    command_list = await get_command()
    return ResponseModel(command_list, 200, "", False)


@router.get("/{command_id}")
async def read_command_data(command_id: str):
    command = await get_command(command_id)
    return ResponseModel(command, 200, "command retrieved successfully.", False)


@router.post("/add", response_description="command data added into the database")
async def add_command_data(command: CommandModel):
    
    await process_command(command)
    
    return ResponseModel(True, 200, "command added and sent successfully.", False)


@router.put("/update")
async def update_command_data(command: CommandModel):
    command = command.as_dict()
    command_encoded = jsonable_encoder(command)
    updated_command = await update_command(command.get("id"), command_encoded)
    return ResponseModel(updated_command, 200, "command updated successfully.", False)


@router.delete("/{command_id}/delete")
async def delete_command_data(command_id: str):
    deleted_result = await delete_command(command_id)
    return ResponseModel(deleted_result, 200, "command deleted successfully.", False)
