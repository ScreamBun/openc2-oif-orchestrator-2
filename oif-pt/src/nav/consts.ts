export const NAV_HOME = '/home';

export const NAV_DEVICE_LIST = '/devices';
export const NAV_DEVICE_CREATOR = '/devices/create';
export const NAV_DEVICE = '/devices/:deviceID';
export const NAV_DEVICE_EDIT = '/devices/:deviceID/edit';

export const NAV_ACTUATOR_LIST = '/actuators';
export const NAV_ACTUATOR_CREATOR = '/actuators/create';
export const NAV_ACTUATOR = '/actuators/:actuatorID';
export const NAV_ACTUATOR_EDIT = '/actuators/edit/:actuatorID';

export const NAV_COMMAND_GENERATOR = '/commands/generate';
export const NAV_COMMAND_LIST = '/commands/history';
export const NAV_COMMAND = '/commands/history/:commandID';

export const NAV_ABOUT = '/about';

export const NAV_EXTERNAL_OASIS_OPEN = 'https://www.oasis-open.org/';
export const NAV_EXTERNAL_OPENC2 = 'https://openc2.org/';
export const NAV_EXTERNAL_OPENC2_FAQ = 'https://openc2.org/faqs.html';

export const NAV_EXTERNAL_OIF = "#";
export const NAV_EXTERNAL_OIF_DEVICE = "https://github.com/oasis-open/openc2-oif-device";
export const NAV_EXTERNAL_HTTPS = "https://docs.oasis-open.org/openc2/open-impl-https";
export const NAV_EXTERNAL_MQTT = "https://github.com/oasis-tcs/openc2-transf-mqtt";
export const NAV_EXTERNAL_OPENDXL = "https://github.com/oasis-tcs/openc2-transf-odxl";
export const NAV_EXTERNAL_BINN = "https://github.com/liteserver/binn";
export const NAV_EXTERNAL_BENCODE = "https://wiki.theory.org/index.php/BitTorrentSpecification#Bencoding";
export const NAV_EXTERNAL_BSON = "http://bsonspec.org/";
export const NAV_EXTERNAL_CBOR = "https://tools.ietf.org/html/rfc7049";
export const NAV_EXTERNAL_ION = "https://amzn.github.io/ion-docs";
export const NAV_EXTERNAL_JSON = "https://tools.ietf.org/html/rfc8259";
export const NAV_EXTERNAL_MSGPACK = "https://msgpack.org";
export const NAV_EXTERNAL_SEXP = "https://people.csail.mit.edu/rivest/Sexp.txt";
export const NAV_EXTERNAL_SMILE = "https://github.com/FasterXML/smile-format-specification";
export const NAV_EXTERNAL_TOML = "https://github.com/toml-lang/toml";
export const NAV_EXTERNAL_XML = "https://w3.org/TR/2008/REC-xml-20081126/";
export const NAV_EXTERNAL_UBJSON = "http://ubjson.org/";
export const NAV_EXTERNAL_VPACK = "https://github.com/arangodb/velocypack";
export const NAV_EXTERNAL_YAML = "https://yaml.org/spec/1.2/spec.html";

// export const PROTOCOL_LIST = ["HTTPS", "MQTT", "COAP", "HTTP"];
export const PROTOCOL_LIST = ["MQTTv5", "MQTTv311", "HTTP", "HTTPS"];
// export const SERIALIZATION_LIST = ["BENCODE", "BINN", "BSON", "CBOR", "JSON", "MSGPACK", "S EXPRESSION", "SMILE", "TOML", "XML", "UBJSON", "YAML", "VPACK"];
export const SERIALIZATION_LIST = ["JSON"];