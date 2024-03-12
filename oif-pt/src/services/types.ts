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
    received_date: string;
    actuators: Array<string>;
    command: string;
    response_status?: string;
    response_text?: string;
}