import datetime
import json
import uuid

from db.command_collection import add_command
from fastapi.encoders import jsonable_encoder
from transports.mqtt import mqtt_manager
from logic import utils

async def validate_cmd(cmd: dict):
    # TODO Find and enter validation logic
    test = ""

async def build_mqtt_msg(cmd: dict):
    mqtt_msg = {}
    
    # TODO Use command_id as request_id, may not need actuator id
    temp_request_id = uuid.uuid4().hex
    temp_millis = utils.get_current_datetime_in_millis()
    # TODO Use device id from mqtt_manager
    temp_from = "OIF Orchestrator 2"
    
    if isinstance(cmd, str):
        cmd = json.loads(cmd)
        
    if isinstance(cmd["command"], str):
        actual_command = json.loads(cmd["command"])
        cmd["command"]= actual_command
    
    headers_section = { 
        "headers" : {
            "request_id" : temp_request_id,  
            "created" : temp_millis,
            "from" : temp_from,
            "actuator_id" : temp_request_id
        }
    }
    
    body_section = {
        "body" : {
            "openc2" : {
                "request": cmd 
            }
        }
    }
    
    mqtt_msg = { **headers_section, **body_section}
    # mqtt_msg = json.dumps(mqtt_msg)
    
    return mqtt_msg

async def build_http_msg(cmd: dict):
    http_msg = {}
    #TODO Get http msg logic
    
    return http_msg

async def send_msg(msg: dict, protocol: str):
    
    if protocol == "MQTT":
        # TODO: Get topic from actuator / device
        mqtt_manager.publish(msg=msg)
    elif protocol == "HTTP":
        # Send via HTTP
        test = ""
    else:
        print("unable to send, protocal unknown ", protocol)

async def save_command(cmd: dict):
    
    # Leftoff here.....
    if cmd.get('id'):
        id_val = cmd['id']
        if not id_val:
            del cmd['id']
    
    command_encoded = jsonable_encoder(cmd) 
    saved_cmd = await add_command(command_encoded)
    
    return saved_cmd

async def save_msg(msg: str):
    saved_msg = msg
    #TODO Add save logic
    
    return saved_msg

async def process_command(cmd: dict):
    
    cmd = cmd.as_dict()
    cmd["sent_date"] = utils.get_current_datetime_in_millis()
    cmd["status"] = "Sent"
       
    await validate_cmd(cmd)
    await save_command(cmd)
    
    #TODO Get actuator via cmd.actuator_id
    # Get device from actuator
    # Get protocol from device (http or mqtt)
    # For now, just use mqtt......
    
    msg = await build_mqtt_msg(cmd)
    await send_msg(msg, "MQTT")
    await save_msg(msg)
    
    return True
    