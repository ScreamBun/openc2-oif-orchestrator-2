import binascii
import json
import secrets
import socket
import time
import uuid

import toml
import webcolors


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
    client_id = app_configs['GENERAL']['CLIENT_ID']
    client_name = client_id + "-" + get_hostname()
    return client_name

def get_random_color():
    r = secrets.randbelow(256)
    g = secrets.randbelow(256)
    b = secrets.randbelow(256)
    
    color = "rgb({}, {}, {})".format(r,g,b)
    
    return color

def string_to_colour(name: str):
    str_bytes = bytes(name, 'utf-8')
    hex_value = binascii.hexlify(str_bytes)
    color_tup = tuple(int(hex_value[i:i+2], 16) for i in (0, 2, 4))
    
    r = color_tup[0]
    g = color_tup[1]
    b = color_tup[2]
    
    color = "rgb({}, {}, {})".format(r,g,b)
    
    return color
