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
                                <label htmlFor="name">Name</label>
                                <p id="name" className="card mb-2 py-1 px-2" style={{minHeight: '34px'}}>{device.name}</p>                                
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="device_id">Device ID</label>
                                <p id="device_id" className="card mb-2 py-1 px-2" style={{minHeight: '34px'}}>{device.device_id}</p>                                     
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
                                <label htmlFor="transport_protocol">Protocol</label>
                                <p id="transport_protocol" className="card mb-2 py-1 px-2" style={{minHeight: '34px'}}>{device.transport.protocol}</p>                                 
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="transport_serialization">Serialization</label>
                                <p id="transport_serialization" className="card mb-2 py-1 px-2" style={{minHeight: '34px'}}>{device.transport.serialization}</p>                                 
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
                                    <label htmlFor="http_host">Host</label>
                                    <p id="http_host" className="card mb-2 py-1 px-2" style={{minHeight: '34px'}}>{device.transport.http?.host}</p>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="http_port">Port</label>
                                    <p id="http_port" className="card mb-2 py-1 px-2" style={{minHeight: '34px'}}>{device.transport.http?.port}</p>                                    
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="http_api_endpoint">API Endpoint</label>
                                    <p id="http_port" className="card mb-2 py-1 px-2" style={{minHeight: '34px'}}>{device.transport.http?.api_endpoint}</p>                                      
                                </div>                            
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <label htmlFor="http_username">Username</label>
                                    <p id="http_username" className="card mb-2 py-1 px-2" style={{minHeight: '34px'}}>{device.transport.http?.username}</p>                                      
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="http_password">Password</label>
                                    { device.transport.http?.password 
                                    ? <p id='http_password' className="card mb-2 py-1 px-2" style={{minHeight: '34px'}}>**********</p> 
                                    : <p id='http_password' className="card mb-2 py-1 px-2" style={{minHeight: '34px'}}></p> }                                    
                                </div>                           
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <label htmlFor="http_ca_cert">CA Cert</label>
                                    <p id="http_ca_cert" className="card mb-2 py-1 px-2" style={{minHeight: '34px'}}>{device.transport.http?.ca_cert}</p>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="http_client_cert">Client Cert</label>
                                    <p id="http_client_cert" className="card mb-2 py-1 px-2" style={{minHeight: '34px'}}>{device.transport.http?.client_cert}</p>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="http_client_key">Client Key</label>
                                    <p id="http_client_key" className="card mb-2 py-1 px-2" style={{minHeight: '34px'}}>{device.transport.http?.client_key}</p>
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
                                        <label htmlFor="mqtt_broker">Broker</label>
                                        <p id="mqtt_broker" className="card mb-2 py-1 px-2" style={{minHeight: '34px'}}>{device.transport.mqtt?.broker}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="mqtt_port">Port</label>
                                        <p id="mqtt_port" className="card mb-2 py-1 px-2" style={{minHeight: '34px'}}>{device.transport.mqtt?.port}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <label htmlFor="mqtt_pub_topics">Publish to Topics</label>
                                        {device.transport.mqtt?.pub_topics && device.transport.mqtt?.pub_topics.length > 0 ?
                                            <ul className="list-group mb-2">
                                                {device.transport.mqtt?.pub_topics.map(item => {
                                                    return (
                                                        <li className="list-group-item d-flex justify-content-between align-items-center py-1 px-2" key={item}>{item}</li>
                                                    );
                                                })}
                                            </ul>
                                        :
                                            <ul className="list-group mb-2">
                                                <li className="list-group-item d-flex justify-content-between align-items-center py-1 px-2">No items</li>
                                            </ul>
                                        }                                        
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="mqtt_sub_topics">Subscibe to Topics</label>
                                        {device.transport.mqtt?.sub_topics && device.transport.mqtt?.sub_topics.length > 0 ?
                                            <ul className="list-group mb-2">
                                                {device.transport.mqtt?.sub_topics.map(item => {
                                                    return (
                                                        <li className="list-group-item d-flex justify-content-between align-items-center py-1 px-2" key={item}>{item}</li>
                                                    );
                                                })}
                                            </ul>
                                        :
                                            <ul className="list-group mb-2">
                                                <li className="list-group-item d-flex justify-content-between align-items-center py-1 px-2">No items</li>
                                            </ul>
                                        }                                         
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <label htmlFor="mqtt_username">Username</label>
                                        <p id="mqtt_username" className="card mb-2 py-1 px-2" style={{minHeight: '34px'}}>{device.transport.mqtt?.username}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="mqtt_password">Password</label>
                                        { device.transport.mqtt?.password 
                                        ? <p id='mqtt_password' className="card mb-2 py-1 px-2" style={{minHeight: '34px'}}>**********</p> 
                                        : <p id='mqtt_password' className="card mb-2 py-1 px-2" style={{minHeight: '34px'}}></p> }                                                                            
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