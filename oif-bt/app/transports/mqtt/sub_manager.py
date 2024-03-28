import asyncio
import socket
import ssl
import traceback
from benedict import benedict
import paho.mqtt.client as mqtt
import toml

from logic import utils
from logic import message_manager
from models.msg_type import Msg_Type

# def publish_1(client,topic):
#     message="on"
#     print("publish data")
#     client.publish(topic,message)
#     publish_1(client,topic)


def on_connect5(client: mqtt.Client, userdata, flags, rc, properties):
    print("Connected with result code "+str(rc))
    client.subscribe(default_sub_topic)


def on_connect(client: mqtt.Client, userdata, rc):
    print("Connected with result code "+str(rc))
    client.subscribe(default_sub_topic)


def on_log(client, userdata, level, buf):
    print("mqtt: ", buf)   


def on_message(client, userdata, msg):
    try:
        print(msg.topic+" "+str(msg.payload))
        
        msg_str = str(msg.payload.decode("utf-8"))
        print("sub manager: MQTT Message Received *")
        print("\t Message \t=" ,msg_str)
        print("\t Topic \t\t=",msg.topic)
        print("\t QOS \t\t=",msg.qos)
        print("\t Retain flag \t=",msg.retain)
        
        if msg_str == 'offline':
            print('sub manager: offline notification received')
            # TODO: Not sure what to do with these yet...
            return True
        
        message_dict = utils.convert_to_dict(msg_str)
        # msg_benedict = benedict(message_dict) # TODO: Update to use benedict?
    
        routine_save_msg = asyncio.run(async_process_msg(message_dict))
    
    except Exception as e:
        print(traceback.format_exc())
        status = 500
        work_result = "Error processing mqtt message: " + traceback.format_exc() 

 
async def async_process_msg(message: dict):
    try:
        result = await message_manager.save_msg(message, msg_type=Msg_Type.RESPONSE.value)
        # print(result)
    except Exception as e:
        print(f"Error processing response message: {e}")        
    
    
def set_user_pw(client: mqtt.Client, user: str = None, pw: str = None):

    if user is None:
        user = default_username

    if pw is None:
        pw = default_password

    if user and pw:
        client.username_pw_set(user, pw)
        client.tls_set(certfile=None,
                        keyfile=None,
                        cert_reqs=ssl.CERT_REQUIRED)    

    
print("**** Starting MQTT Subscriber...")
app_configs = toml.load("./oif-bt/app/config.toml")
default_broker = app_configs['MQTT']['BROKER']
default_port = app_configs['MQTT']['PORT']
default_protocol = app_configs['MQTT']['PROTOCOL']
default_sub_topic = app_configs['MQTT']['RESPONSE_TOPICS'][0] 

default_username = app_configs['MQTT']['USERNAME']  
default_password = app_configs['MQTT']['PASSWORD']

client_id = app_configs['GENERAL']['CLIENT_ID']
curr_millis = utils.get_current_datetime_in_millis()
client_id = client_id + "-" + socket.gethostname() + "-" + "sub" + "-" + str(curr_millis)

if "v3" in default_protocol:
    client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, str(client_id), None, userdata=True, protocol=mqtt.MQTTv311, transport="tcp") 
    client.on_log = on_log
    client.on_connect = on_connect
else:
    client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, str(client_id), None, userdata=True, protocol=mqtt.MQTTv5, transport="tcp") 
    client.on_log = on_log
    client.on_connect = on_connect5
    
client.on_message = on_message

set_user_pw(client)  # Needed for AWS and MQHIV Brokers
 
client.connect(default_broker, default_port)
client.loop_start()  