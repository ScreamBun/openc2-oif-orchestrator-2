export interface Device {
    id?: string;
    device_id?: string;
    name?: string;
    transport: {
        protocol?: string;
        serialization?: string;
        http: {
            host?: string;
            port?: number | undefined;
            api_endpoint?: string;
            username?: string;
            password?: string;
            ca_cert?: string;
            client_cert?: string;
            client_key?: string;
        }, 
        mqtt: {
            broker?: string;
            port?: string;
            pub_topics?: Array<string>;
            sub_topics?: Array<string>;
            username?: string;
            password?: string;          
        }
    }
}

export interface Actuator {
    id?: string;
    name: string;
    parent_device: string;
    profile?: string;
    schema: any;
    note?: string;
}

export interface Command {
    id?: string;
    date_created?: string;
    request_id?: string;
    command: string;
}

export interface Message {
    id?: string;
    request_id?: string;
    date_sent?: string;
    date_received?: string;
    date_created?: string;
    created_by?: string;
    color_indicator?: string;
    msg: string;
    msg_type: string;
}