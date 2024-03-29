from fastapi import APIRouter
from models.common import ResponseModel
from logic import message_manager


router = APIRouter(
    prefix="/message",
    tags=["Message"],
    responses={404: {"description": "Not found"}},
)

@router.get("/messages/", response_description="Get all messages")
async def get_messages():
    message_list = await message_manager.get_msgs()
    return ResponseModel(message_list, 200, "", False)


@router.get("/messages/{request_id}", response_description="Get messages by request id")
async def getMessagesbyRequestId(request_id: str):
    message_list = []
    if request_id:
         message_list = await message_manager.get_msgs_by_request_id(request_id)
    return ResponseModel(message_list, 200, "", False)


@router.get("/{message_id}", response_description="Get message by id")
async def read_message_data(message_id: str):
    message = await message_manager.get_msg_by_id(message_id)
    return ResponseModel(message, 200, "message retrieved successfully.", False)
 

# @router.post("/add", response_description="message data added into the database")
# async def add_message_data(message: MessageModel):

#     await message_manager.process_message(message)
    
#     print("pub finished")
#     return ResponseModel(True, 200, "message added and sent successfully.", False)


# @router.put("/update")
# async def update_message_data(message: MessageModel):
#     message = message.as_dict()
#     message_encoded = jsonable_encoder(message)
#     updated_message = await message_collection.update_message(message.get("id"), message_encoded)
#     return ResponseModel(updated_message, 200, "message updated successfully.", False)


# @router.delete("/{message_id}/delete")
# async def delete_message_data(message_id: str):
#     deleted_result = await message_collection.delete_message(message_id)
#     return ResponseModel(deleted_result, 200, "message deleted successfully.", False)
