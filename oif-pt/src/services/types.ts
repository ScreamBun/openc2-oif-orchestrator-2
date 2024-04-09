export interface Device {
    id?: string;
    device_id: string;
    name: string;
    transport: {
        host?: string;
        port?: number | undefined;
        protocol?: string;
        serialization?: Array<string>;
        https_path?: string;
        https_security?: 'Production' | 'Development';
        auth: {
            username?: string;
            password?: string;
            ca_cert?: string;
            client_cert?: string;
            client_key?: string;
        }
    }
    note?: string;
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

export interface MessageWrapper {
    id: string;
    message: Message;
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