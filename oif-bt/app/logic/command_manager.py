from db import command_collection
from fastapi import encoders

from logic import message_manager
from logic import utils
from models.msg_type import Msg_Type

async def validate_cmd(cmd: dict):
    # TODO Find and enter validation logic
    test = ""

async def save_command(cmd: dict):
    
    #TODO will need another path for updates with the _id
    
    if "id" in cmd:
        del cmd['id']
        
    cmd["request_id"] = utils.build_request_id()
    
    command_encoded = encoders.jsonable_encoder(cmd) # needed??
    saved_cmd = await command_collection.add_command(command_encoded)
    
    return saved_cmd

async def process_command(cmd: dict):
    
    cmd = cmd.as_dict()
       
    await validate_cmd(cmd)
    await save_command(cmd)
    
    #TODO Get actuator via cmd.actuator_id
    # Get device from actuator
    # Get protocol from device (http or mqtt)
    # For now, just use mqtt......
    
    msg = await message_manager.build_mqtt_msg(cmd)
    
    # TODO: Get topic from actuator / device
    await message_manager.send_msg(msg=msg, protocol="MQTT")
    await message_manager.save_msg(msg, msg_type=Msg_Type.COMMAND.value)
    
    return True
    