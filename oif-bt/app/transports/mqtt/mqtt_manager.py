import json
import os
import socket
import ssl
import traceback
import uuid
import paho.mqtt.client as mqtt

from benedict import benedict
from paho.mqtt.packettypes import PacketTypes
from paho.mqtt.properties import Properties
import toml

# from command.transports.response import process_response
# from command.transports.relay import process_relay


def on_connect(client, userdata, flags, rc):
    print("mqtt: New mqtt instance connected")
    # client.subscribe("$SYS/#")
    client.connected_flag=True    


def on_log(client, userdata, level, buf):
    print("mqtt: ", buf)      


def publish(topic = None, msg = "test"):

    print("mqtt: Publishing ->")
    print("\t Topic \t\t=" ,topic)        
    print("\t Message \t=" ,msg)        
    b_msg = msg.encode('utf-8').strip()     

    openc2_properties = Properties(PacketTypes.PUBLISH)
    if "v3" in default_protocol:
        openc2_properties = None  
    else:
        openc2_properties.PayloadFormatIndicator = 1
        openc2_properties.ContentType = 'application/openc2'
        openc2_properties.UserProperty = [('msgType', 'req'), ('encoding', 'json')] 

    qos = 0
    retain = True

    return client.publish(topic, b_msg, qos, retain, openc2_properties)


def on_message(client, userdata, message):
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


def set_user_pw(user: str = None, pw: str = None):

    if user is None:
        user = default_username

    if pw is None:
        pw = default_password

    client.username_pw_set(user, pw)
    client.tls_set(certfile=None,
                    keyfile=None,
                    cert_reqs=ssl.CERT_REQUIRED)    

def connect_to_broker(broker: str = None, port: str = None):

    if broker is None:
        broker = default_broker

    if port is None:
        port = default_port      

    try:
        client.connect(broker, port) 
    except Exception:
        print("mqtt: Unable to connect to MQTT Broker")
        print(traceback.format_exc())  

def subscribe_to_topics(topics: list = None):

    if topics is None:
        topics = []
        topics.extend(default_rsp_topics)
        # topics.extend(default_relay_topics)

    for topic in topics:
        print("mqtt: Subscribing to Topic: ", topic)
        client.subscribe(topic)          


def shutdown():
    print("Shutting down MQTT Instance: ", client_id)
    client.disconnect()
    client.loop_stop()

print(os.getcwd())
mqtt_configs = toml.load("./oif-bt/app/config.toml")
client_id = mqtt_configs['MQTT']['CLIENT_ID']
default_broker = mqtt_configs['MQTT']['BROKER']
default_port = mqtt_configs['MQTT']['PORT']
default_protocol = mqtt_configs['MQTT']['PROTOCOL']

default_cmd_topics = mqtt_configs['MQTT']['SEND_TOPICS']
default_rsp_topics = mqtt_configs['MQTT']['RESPONSE_TOPICS']     
# default_relay_topics = mqtt_configs['relay_topics']  

default_username = mqtt_configs['MQTT']['USERNAME']  
default_password = mqtt_configs['MQTT']['PASSWORD']

client_id = client_id + "-" + str(uuid.uuid4())
client_id = client_id + "-" + socket.gethostname()

if "v3" in default_protocol:
    client = mqtt.Client(client_id, None, userdata=True, protocol=mqtt.MQTTv311, transport="tcp") 
else:
    client = mqtt.Client(client_id, None, userdata=True, protocol=mqtt.MQTTv5, transport="tcp") 

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.on_log = on_log

print("MQTT Instance Started")
print("\t Client ID \t\t= ", client_id)
print("\t Default Broker \t= ", default_broker)
print("\t Default Port \t\t= ", default_port)
print("\t Default Protocol \t= ", default_protocol)
print("\t Default CMD Topics \t= ", default_cmd_topics)
print("\t Default RSP Topics \t= ", default_rsp_topics)
print()