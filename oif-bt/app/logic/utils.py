import json
import socket
import time
import uuid

import toml


def is_json(data):
    try:
        json_object = json.loads(data)
    except ValueError as e:
        return False
    return True

def convert_to_dict(data):
    dict_data = {}
    
    if is_json(data) or isinstance(data, str):
        try:
            dict_data = json.loads(data)
        except Exception as ex:
            error_msg = str(ex)
            raise f"Unable to convet data to dict: {error_msg}"            

    return dict_data

def build_request_id():
    return uuid.uuid4().hex

def get_current_datetime_in_millis() -> int :
    return int(round(time.time() * 1000))

def get_hostname() -> str : 
    return socket.gethostname()

def get_client_name() -> str : 
    app_configs = toml.load("./oif-bt/app/config.toml")
    client_id = app_configs['CLIENT_ID']
    client_name = client_id + "-" + get_hostname()
    return client_name