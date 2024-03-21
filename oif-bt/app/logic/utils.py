import socket
import time

import toml


def get_current_datetime_in_millis() -> int :
    return int(round(time.time() * 1000))

def get_hostname() -> str : 
    return socket.gethostname()

def get_client_name() -> str : 
    app_configs = toml.load("./oif-bt/app/config.toml")
    client_id = app_configs['CLIENT_ID']
    client_name = client_id + "-" + get_hostname()
    return client_name