import time
import uuid

import paho.mqtt.client as paho


class MqttManager:

    # TODO: Pull these from a config.toml file
    # broker = "localhost"
    # broker="mosquitto.olympus.mtn" # Local SB Lab Broker
    broker="test.mosquitto.org" # External Test Broker

    client = ""
    client_id = "orch_mqtt"
    send_topics = ["oc2/cmd", "oc2/cmd/all"]
    listen_topics = ["oc2/rsp"]
    port = 1883    
    test_msg = {
                "action": "investigate",
                    "target": {
                        "th": {
                            "hunt": "chrome 110.0.5481.177"
                        }
                    }
                }       

    def publish(self, topic=send_topics[0], msg="test"):
        print("Publishing ->")
        print("\t Topic \t\t=" ,topic)        
        print("\t Message \t=" ,msg)        
        b_msg = msg.encode('utf-8').strip()
        return self.client.publish(topic, b_msg)

    def on_message(self, client, userdata, message):
        print("Message Received *")
        print("\t Message \t=" ,str(message.payload.decode("utf-8")))
        print("\t Topic \t\t=",message.topic)
        print("\t QOS \t\t=",message.qos)
        print("\t Retain flag \t=",message.retain)   

    def shutdown(self):
        print("Shutting down MQTT Instance \t= ", self.client_id)
        self.client.disconnect()
        self.client.loop_stop()

    def __init__(self, broker=broker):
        print("Creating MQTT Instance +")

        self.client_id = self.client_id + "-" + str(uuid.uuid4())
        print("\t Orchestrator ID \t= ", self.client_id)

        self.broker=broker
        print("\t Broker \t\t= ", self.broker)

        self.client = paho.Client(self.client_id) 
        self.client.on_message=self.on_message #attach function to callback

        self.client.connect(self.broker) 
        self.client.loop_start() 

        for topic in self.listen_topics:
            print("\t Subscribing to topic \t= ", topic)
            self.client.subscribe(topic)           
