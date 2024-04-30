import { SBDeleteBtn, SBEditBtn } from "../common/CRUDBtns";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDeviceByIDQuery, useRemoveDeviceMutation } from "../../services/apiSlice";
import { NAV_DEVICE_LIST } from "../../nav/consts";
import { SBBackBtn } from "../common/SBBackBtn";
import { SBLabel } from "../common/SBLabel";

const DeviceDetails = () => {
    const { deviceID } = useParams<{ deviceID: string }>();

    const goto = useNavigate();
    const { data: device, isLoading, error } = useGetDeviceByIDQuery(`${deviceID}`);

    const [deleteDevice, { isLoading: isDeleting }] = useRemoveDeviceMutation();

    const onDelete = () => {
        deleteDevice(`${deviceID}`);
        goto(NAV_DEVICE_LIST);
    }   

    //TODO: toggle password

    //TODO: file preview ?

    if (isLoading) {
        return (
            <div className="card">
                <div className="card-header">
                    <div className='row'>
                        <div className='col-9 my-auto'>
                            {/* Device Details <span className="text-muted">{deviceID} </span> */}
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <span className="text-muted"> Loading... </span>
                </div>
            </div>
        );
    }

    if (!device || error) {
        return (
            <div className="card">
                <div className="card-header">
                    <div className='row'>
                        <div className='col-9 my-auto'>
                            <SBDeleteBtn id={deviceID} type={'device'} onDelete={onDelete} disabled={isDeleting} customClass='float-end' />
                            Device Details <span className="text-muted">{deviceID} </span>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <span style={{ color: 'red' }}> {error ? `${error}` : `ERROR: Device ${deviceID} does not exist.`}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            <div className="card-header">
                <div className='row'>
                    <div className='col-9'>
                        <SBBackBtn link={NAV_DEVICE_LIST}></SBBackBtn>                  
                        <span>{device.name}</span>
                    </div>
                    <div className='col-3'>
                        <SBDeleteBtn id={deviceID} type={'device'} onDelete={onDelete} disabled={isDeleting} customClass='float-end' />
                        <SBEditBtn link={`/devices/${deviceID}/edit/`} customClass='me-1 float-end' />
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="card">
                    <div className="card-header">
                        Identification
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <SBLabel labelFor="name" labelText="Name" labelValue={device.name}></SBLabel>
                            </div>
                            <div className="col-md-4">
                                <SBLabel labelFor="device_id" labelText="Device ID" labelValue={device.device_id}></SBLabel>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mt-2">
                    <div className="card-header">
                        Transport
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <SBLabel labelFor="transport_protocol" labelText="Protocol" labelValue={device.transport.protocol}></SBLabel>
                            </div>
                            <div className="col-md-4">
                                <SBLabel labelFor="transport_serialization" labelText="Serialization" labelValue={device.transport.serialization}></SBLabel>
                            </div>
                        </div>
                    </div>
                </div>
                { device.transport?.protocol?.includes("HTTP") 
                    ? 
                    <div className="card mt-2">
                        <div className="card-header">
                            HTTP
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <SBLabel labelFor="http_host" labelText="Host" labelValue={device.transport.http?.host}></SBLabel>
                                </div>
                                <div className="col-md-4">
                                    <SBLabel labelFor="http_port" labelText="Port" labelValue={device.transport.http?.port}></SBLabel>
                                </div>
                                <div className="col-md-4">
                                    <SBLabel labelFor="http_api_endpoint" labelText="API Endpoint" labelValue={device.transport.http?.api_endpoint}></SBLabel>
                                </div>                            
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <SBLabel labelFor="http_username" labelText="Username" labelValue={device.transport.http?.username}></SBLabel>
                                </div>
                                <div className="col-md-4">
                                    <SBLabel labelFor="http_password" labelText="Password"></SBLabel>
                                    { device.transport.http?.password 
                                    ? <p id='http_password'>**********</p> 
                                    : <p id='http_password'></p> }
                                     
                                </div>                           
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <SBLabel labelFor="http_ca_cert" labelText="CA Cert" labelValue={device.transport.http?.ca_cert}></SBLabel>
                                </div>
                                <div className="col-md-4">
                                    <SBLabel labelFor="http_client_cert" labelText="Client Cert" labelValue={device.transport.http?.client_cert}></SBLabel>
                                </div>
                                <div className="col-md-4">
                                    <SBLabel labelFor="http_client_key" labelText="Client Key" labelValue={device.transport.http?.client_key}></SBLabel>
                                </div>                            
                            </div>  
                        </div>                    
                    </div>
                    :
                    <span></span>
                }

                { device.transport?.protocol?.includes("MQTT") 
                        ?
                        <div className="card mt-2">
                            <div className="card-header">
                                MQTT
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <SBLabel labelFor="mqtt_broker" labelText="Broker" labelValue={device.transport.mqtt?.broker}></SBLabel>
                                    </div>
                                    <div className="col-md-4">
                                        <SBLabel labelFor="mqtt_port" labelText="Port" labelValue={device.transport.mqtt?.port}></SBLabel>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <SBLabel labelFor="mqtt_pub_topics" labelText="Publish to Topics" labelValue={device.transport.mqtt?.pub_topics}></SBLabel>
                                    </div>
                                    <div className="col-md-4">
                                        <SBLabel labelFor="mqtt_sub_topics" labelText="Subscibe to Topics" labelValue={device.transport.mqtt?.sub_topics}></SBLabel>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <SBLabel labelFor="mqtt_username" labelText="Username" labelValue={device.transport.mqtt?.username}></SBLabel>
                                    </div>
                                    <div className="col-md-4">
                                        <SBLabel labelFor="mqtt_password" labelText="Password" labelValue={device.transport.mqtt?.password}></SBLabel>
                                    </div>                           
                                </div> 
                            </div>                    
                        </div>
                        :
                        <span></span>
                    }
            </div>
        </div>
    );
}

export default DeviceDetails; 