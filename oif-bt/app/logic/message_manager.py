import json
import uuid
import toml
from db import message_collection
from models.message import MessageModel
from transports.mqtt import mqtt_manager
from logic import utils


async def build_mqtt_msg(cmd: dict):
    mqtt_msg = {}
    
    # TODO Use command_id as request_id, may not need actuator id
    temp_request_id = uuid.uuid4().hex
    temp_millis = utils.get_current_datetime_in_millis()
    # TODO Use device id from mqtt_manager
    temp_from = "OIF Orchestrator 2"
    
    if isinstance(cmd, str):
        cmd = json.loads(cmd)
        
    actual_command = {}        
    if isinstance(cmd["command"], str):
        actual_command = json.loads(cmd["command"])
        cmd["command"] = actual_command
    else:
        actual_command = cmd["command"]
    
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
                "request": actual_command 
            }
        }
    }
    
    mqtt_msg = { **headers_section, **body_section}
    
    return mqtt_msg


async def build_http_msg(cmd: dict):
    http_msg = {}
    #TODO Get http msg logic
    
    return http_msg


async def save_msg(message: dict):
    curr_millis = utils.get_current_datetime_in_millis()
    req_id = message['headers']['request_id'] # TODO Unreliable
    msg_str = json.dumps(message)
    
    message_dict = {
        'request_id' : req_id,
        'date_sent' : curr_millis,
        'msg' : msg_str,
        'status' : 'Sent'
    }

    saved_msg = await message_collection.add_message(message_dict)
    
    return saved_msg


async def send_msg(msg: dict, protocol: str, topic: str = None):
    
    if not msg:
        raise("Error: Message missing")
    
    if protocol == "MQTT":
        
        if not topic:
            topic = default_cmd_topics[0]
        
        mqtt_msg_info = mqtt_manager.publish(msg=msg, topic=topic)
        print(mqtt_msg_info)
    elif protocol == "HTTP":
        # Send via HTTP
        test = ""
    else:
        print("unable to send, protocal unknown ", protocol)
        

app_configs = toml.load("./oif-bt/app/config.toml")
default_cmd_topics = app_configs['MQTT']['SEND_TOPICS']