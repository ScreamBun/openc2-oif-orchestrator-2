import socket
import ssl
import paho.mqtt.client as mqtt
import toml

from logic import utils

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
    print(msg.topic+" "+str(msg.payload))
    
    
def set_user_pw(client: mqtt.Client, user: str = None, pw: str = None):

    if user is None:
        user = default_username

    if pw is None:
        pw = default_password

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