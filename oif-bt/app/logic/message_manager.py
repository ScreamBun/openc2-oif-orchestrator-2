import json
import toml
from db import message_collection
from transports.mqtt import mqtt_manager
from models.msg_type import Msg_Type
from models.message import MessageModel
from logic import utils


async def build_mqtt_msg(cmd: dict):
    mqtt_msg = {}
    
    request_id = cmd["request_id"]
    curr_time_millis = utils.get_current_datetime_in_millis()
    request_from = utils.get_client_name()
    
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
            "request_id" : request_id,  
            "created" : curr_time_millis,
            "from" : request_from
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


async def convert_inner_msg(msg: dict):
    actual_msg = {}
    actual_msg_str = msg.get('msg')
    
    if actual_msg_str:
        actual_msg = utils.convert_to_dict(actual_msg_str)
        msg["msg"] = actual_msg
        
        inner_msg = msg.get("msg")
        if inner_msg:
            body = inner_msg.get("body")
            if body:
                openc2 = body.get("openc2")
                if openc2:
                    response = openc2.get("response")
                    if response:
                        results = response.get("results")
                        if results and isinstance(results, str):
                            
                            actual_results = results
                            if utils.is_json(results):                           
                                actual_results = utils.convert_to_dict(results)
                                
                            msg["msg"]["body"]["openc2"]["response"]["results"] = actual_results
            
    return msg


async def get_msgs():
    message_list = await message_collection.get_messages()
    
    for i, val in enumerate(message_list):
        msg = await convert_inner_msg(val)
        message_list[i] = msg

    return message_list

async def get_msgs_by_request_id(request_id: str):
    message_list = await message_collection.get_messages_by_request_id(request_id)
    
    for i, val in enumerate(message_list):
        msg = await convert_inner_msg(val)
        message_list[i] = msg

    return message_list


async def get_msg_by_id(id: str):
    msg = await message_collection.get_message(id)
    msg = await convert_inner_msg(msg)

    return msg


async def save_msg(message: dict, msg_type: str):
    curr_millis = utils.get_current_datetime_in_millis()
    msg_str = json.dumps(message)
    
    message_dict = {
        'msg' : msg_str,
        'msg_type' : msg_type
    }
    
    if message['headers']['request_id']:
        req_id = message['headers']['request_id']
        message_dict['request_id'] = req_id
    
    if msg_type == Msg_Type.COMMAND.value:
        message_dict['date_sent'] = curr_millis
    elif msg_type == Msg_Type.RESPONSE.value:
        message_dict['date_received'] = curr_millis
        
    if message['headers']['from']:
        message_dict['created_by'] = message['headers']['from']
        color_indicator = utils.string_to_color(message_dict["created_by"])
        # print("generating color : "+color_indicator)
    else:
        message_dict['created_by'] = "Unknown"    
        color_indicator = ('#000000')

   
    # color_indicator = utils.get_random_color()
    # color_indicator = utils.string_to_colour(message_dict['created_by'])

    message_dict['color_indicator'] = color_indicator
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
        
    return True
        

app_configs = toml.load("./oif-bt/app/config.toml")
default_cmd_topics = app_configs['MQTT']['SEND_TOPICS']