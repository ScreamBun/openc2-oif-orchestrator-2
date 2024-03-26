import json
import socket
import ssl
import time
import traceback
import paho.mqtt.client as mqtt

from benedict import benedict
from paho.mqtt.packettypes import PacketTypes
from paho.mqtt.properties import Properties
import toml

# from command.transports.response import process_response
# from command.transports.relay import process_relay


def setup_client(broker:str = None, port:str = None, topics:list = None) -> mqtt.Client:

    # TODO: pass in variables broker, etc.  Just using defaults for now

    if "v3" in default_protocol:
        client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, str(client_id), None, userdata=True, protocol=mqtt.MQTTv311, transport="tcp") 
        client.on_connect = on_connect
    else:
        client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, str(client_id), None, userdata=True, protocol=mqtt.MQTTv5, transport="tcp") 
        client.on_connect = on_connect5

    client.on_log = on_log

    set_user_pw(client)
    
    connect_to_broker(client=client, broker=broker, port=port)
    
    if topics:
        client.on_message = on_message
    
    return client


def get_properties(is_pub: bool, protocol: str):
    
    if is_pub:
        openc2_properties: Properties = Properties(PacketTypes.PUBLISH)
    else:
        openc2_properties: Properties = Properties(PacketTypes.SUBSCRIBE)
        
    if not protocol:
        protocol = default_protocol
    
    if "v3" in protocol:
        openc2_properties = None  
    else:
        openc2_properties.PayloadFormatIndicator = 1
        openc2_properties.ContentType = 'application/openc2'
        openc2_properties.UserProperty = [('msgType', 'req'), ('encoding', 'json')]
        
    return openc2_properties


def publish(topic = "oc2/cmd", msg = "test"):

    print("mqtt: Publishing ->")
    print("\t Topic \t\t=" ,topic)        
    print("\t Message \t=" ,msg)
    
    if isinstance(msg, dict):
        msg = json.dumps(msg)
       
    b_msg = msg.encode('utf-8').strip()     

    client = setup_client(broker=default_broker, port=default_port)
    
    client.loop_start()
    
    # unfortunate... but you need to wait a sec for the connection to happen
    time.sleep(1)    
    
    openc2_properties = get_properties(True, None) 
        
    qos = 0
    retain = False          
        
    try:
        mqtt_msg_info = client.publish(topic, b_msg, qos, retain, openc2_properties)
    except ValueError as ex:
        client.loop_stop()
        error_msg = str(ex)
        raise(error_msg)
    
    client.loop_stop()
    
    return mqtt_msg_info


def on_connect5(client: mqtt.Client, userdata, flags, rc, properties):
    # print("mqtt: New mqtt instance connected")
    # client.subscribe("$SYS/#")
    client.connected_flag=True   
    client.is_connected
    

def on_connect(client: mqtt.Client, userdata, flags, rc):
    # print("mqtt: New mqtt instance connected")
    # client.subscribe("$SYS/#")
    client.connected_flag=True    
    client.is_connected


def on_log(client, userdata, level, buf):
    print("mqtt: ", buf)     


def on_message(client: mqtt.Client, userdata, message):
    m_decode = str(message.payload.decode("utf-8"))
    print("mqtt: Message Received *")
    print("\t Topic \t\t=",message.topic)
    print("\t Message \t=" ,m_decode)    

    message_dict = None
    try:
        message_dict=json.loads(m_decode) 
    except:
        print("mqtt: Invalid json returned in response: " + m_decode)
        return None
    
    if not isinstance(message_dict, dict):
        print("mqtt: Unable to process response message")
        return None
    
    msg_benedict = benedict(message_dict, keypath_separator="/")

    if "headers/request_id" not in msg_benedict:
        print("mqtt: Response message missing request id")
        return None
    
    # TODO
    # if message.topic in default_relay_topics:

    #     if "body/openc2/request" not in msg_benedict:
    #         print("mqtt: Response message missing body")
    #         return None
        
        # process_relay(msg_benedict)
    else:

        if "body/openc2/response" not in msg_benedict:
            print("mqtt: Response message missing body")
            return None

        # TODO
        # process_response(msg_benedict)

    pass


# def on_publish(mosq, obj, mid):
#     print("*****mqtt: on_publish mid: " + str(mid))

# def on_subscribe(client, userdata, mid, granted_qos):
#     print("*****mqtt: on_subscribe: " + str(mid) + " " + str(granted_qos))


def set_user_pw(client: mqtt.Client, user: str = None, pw: str = None):

    if user is None:
        user = default_username

    if pw is None:
        pw = default_password

    client.username_pw_set(user, pw)
    client.tls_set(certfile=None,
                    keyfile=None,
                    cert_reqs=ssl.CERT_REQUIRED)    


def connect_to_broker(client: mqtt.Client, broker: str = None, port: str = None):

    if broker is None:
        broker = default_broker

    if port is None:
        port = default_port      

    print("mqtt: Broker ", broker)
    print("mqtt: Port ", port)

    try:
        # client.connect(broker, port) 
        client.connect_async(broker, port) 
    except Exception:
        print("mqtt: Unable to connect to MQTT Broker")
        print(traceback.format_exc())  


def subscribe_to_topics(client: mqtt.Client, topics: list = []):

    if topics:
        for topic in topics:
            print("mqtt: Subscribing to Topic ", topic)
            client.subscribe(topic)          


def shutdown(client: mqtt.Client):
    print("mqtt: Shutting down MQTT Instance ", client_id)
    client.disconnect()
    client.loop_stop()


app_configs = toml.load("./oif-bt/app/config.toml")
client_id = app_configs['GENERAL']['CLIENT_ID']
default_broker = app_configs['MQTT']['BROKER']
default_port = app_configs['MQTT']['PORT']
default_protocol = app_configs['MQTT']['PROTOCOL']

default_cmd_topics = app_configs['MQTT']['SEND_TOPICS']
default_rsp_topics = app_configs['MQTT']['RESPONSE_TOPICS']     
# default_relay_topics = mqtt_configs['relay_topics']  

default_username = app_configs['MQTT']['USERNAME']  
default_password = app_configs['MQTT']['PASSWORD']

client_id = client_id + "-" + socket.gethostname()

# client.on_message = on_message
# client.on_log = on_log

print("MQTT INfo")
print("\t Client ID \t\t= ", client_id)
print("\t Default Broker \t= ", default_broker)
print("\t Default Port \t\t= ", default_port)
print("\t Default Protocol \t= ", default_protocol)
print("\t Default CMD Topics \t= ", default_cmd_topics)
print("\t Default RSP Topics \t= ", default_rsp_topics)
print()