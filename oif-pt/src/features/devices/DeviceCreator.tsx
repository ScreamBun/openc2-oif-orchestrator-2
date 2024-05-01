import { faEye, faEyeSlash, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NAV_DEVICE_LIST, PROTOCOL_LIST, SERIALIZATION_LIST } from "../../nav/consts";
import { useAddNewDeviceMutation, useEditDeviceMutation, useGetDeviceByIDQuery } from "../../services/apiSlice";
import { Device } from "../../services/types";
import SBChecklist from "../common/SBChecklist";
import { sbToastError, sbToastSuccess } from "../common/SBToast";
import { SBCancelBtn } from "../common/SBCancelBtn";
import { SBLabel } from "../common/SBLabel";
import SBSelect from "../common/SBSelect";
import { Option } from "../common/SBSelect";
import SBGroupList from "../common/SBGroupList";


const initialState: Device = {
    id: '',
    device_id: '',
    name: '',
    transport: {
        protocol: '',
        serialization: '',
        http: {
            host: '',
            port: undefined,
            api_endpoint: '',
            username: '',
            password: '',
            ca_cert: '',
            client_cert: '',
            client_key: ''
        },
        mqtt: {
            broker: '',
            port: '',
            pub_topics: [],
            sub_topics: [],
            username: '',
            password: ''
        }
    }
}

const DeviceCreator = () => {
    const { deviceID } = useParams<{ deviceID: string}>();
    const goto = useNavigate();

    const { data: device, isLoading, error } = useGetDeviceByIDQuery(`${deviceID}`);

    const [inputData, setInputData] = useState(device ? device : initialState);
    const [isEditing, setIsEditing] = useState(device?.id ? true : false);
    const [showPassword, setShowPassword] = useState(false); 

    const [addNewDevice, { isLoading: isFetching }] = useAddNewDeviceMutation();
    const [updateDevice, { isLoading: isUpdating }] = useEditDeviceMutation();

    const onSave = async () => {

        if (isEditing) {
            await updateDevice(inputData).unwrap()
                .then(() => {
                    setIsEditing(false);
                    // sbToastSuccess(`Device updates saved`)
                    goto(`${NAV_DEVICE_LIST}/${deviceID}`);
                })
                .catch((err) => {
                    console.log(err);
                    sbToastError(`Error: Failed to update device`);
                    return;
                })

        } else {
            await addNewDevice(inputData).unwrap()
                .then(() => {
                    setInputData(initialState);
                    // sbToastSuccess(`New device created`)
                    goto(`${NAV_DEVICE_LIST}`);
                })
                .catch((err) => {
                    console.log(err);
                    sbToastError(`Error: Failed to update device`);
                    return;
                })
        }
    }

    const toggleShowPw = () => { 
        setShowPassword(!showPassword); 
    };     

    const handleChange = (fieldName: string, fieldValue: any) => {
        let key: string = "";
        if (fieldName.includes(".")) {
            const keys = fieldName.split('.')
            key = keys[keys.length - 1];
        }
        // console.info("fieldName " + fieldName)
        // console.info("fieldValue " + fieldValue)
        // console.info("key " + key)

        if (fieldName.includes("transport") && !fieldName.includes("http") && !fieldName.includes("mqtt")) {
            // console.log("transport")
            setInputData((values: any) => ({ ...values, transport: { ...values.transport, [key]: fieldValue } }))
            

        } else if (fieldName.includes("transport") && fieldName.includes("http")) {
            // console.log("transport http")
            setInputData((values: any) => ({ ...values, transport: { ...values.transport, http: { ...values.transport.http, [key]: fieldValue } } }))

        } else if (fieldName.includes("transport") && fieldName.includes("mqtt")) {
            // console.log("transport mqtt")
            setInputData((values: any) => ({ ...values, transport: { ...values.transport, mqtt: { ...values.transport.mqtt, [key]: fieldValue } } }))

        } else {
            setInputData((values: any) => ({ ...values, [fieldName]: fieldValue }))
        }
    }

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const key = e.target.name;
        const value = e.target.value;
        handleChange(key, value);
    }

    const testData = ['test1', 'test2', 'test3'];
    const [testSelection, setTestSelection] = useState<Option | null>();

    const handleSelection = (e: Option) => {
        setTestSelection(e);
    }

    //TODO: handle file Upload
    if (isLoading) {
        return (
            <div className="card">
                <div className="card-header">
                    <div className='row'>
                        <div className='col-9 my-auto'>
                            {isEditing ? 'Device Editor' : 'Device Creator'}
                        </div>
                        <div className='col-3'>
                            <SBCancelBtn customClass={'ms-2 float-end'}></SBCancelBtn>
                            <button type="button" className="btn btn-sm btn-success float-end" title="Save" onClick={onSave}>
                                <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <span className="text-muted"> Loading... </span>
                </div>
            </div>
        );
    }

    if ((isEditing && !device) || error) {
        return (
            <div className="card">
                <div className="card-header">
                    <div className='row'>
                        <div className='col-9 my-auto'>
                            {isEditing ? 'Device Editor' : 'Device Creator'}
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
                    <div className='col-9 my-auto'>
                        {isEditing ? `${inputData.name}` : 'New Device'}
                    </div>
                    <div className='col-3'>
                        <SBCancelBtn customClass={'ms-2 float-end'}></SBCancelBtn>
                        <button type="button" className="btn btn-sm btn-success float-end" title="Save" onClick={onSave}>
                            <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>
                        </button>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <form onSubmit={onSave}>

                    <div className="card">
                        <div className="card-header">
                            Identification
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <SBLabel labelFor={'name'} labelText={'Name'} isRequired={true} />
                                    <input type='text' className="form-control" id="name" name="name" value={inputData.name ?? ''} onChange={handleFieldChange} required />
                                </div>
                                <div className="col-md-4">
                                    <SBLabel labelFor={'device_id'} labelText={'Device ID'} isRequired={true} />
                                    <input type='text' className={`form-control${isEditing ? '-plaintext' : ''}`} readOnly={isEditing ? true : false}
                                        id="device_id" name="device_id" value={inputData.device_id ?? ''} onChange={handleFieldChange} required/>
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
                                    <SBLabel labelFor="transport_protocol" labelText="Protocol"></SBLabel>
                                    <select required className="form-select" id="transport_protocol" name="transport.protocol" value={inputData.transport?.protocol ?? ''} onChange={handleFieldChange}>
                                    <option value=''>Choose...</option>
                                    {PROTOCOL_LIST.map((s: any) => <option key={s} value={s} >{s}</option>)}
                                </select>                                    
                                </div>
                                <div className="col-md-4">
                                    <SBLabel labelFor="transport_serialization" labelText="Serialization"></SBLabel>
                                    <select required className="form-select" id="transport_serialization" name="transport.serialization" value={inputData.transport?.serialization ?? ''} onChange={handleFieldChange}>
                                    <option value=''>Choose...</option>
                                    {SERIALIZATION_LIST.map((s: any) => <option key={s} value={s} >{s}</option>)}
                                </select>                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    { inputData.transport?.protocol?.includes("HTTP") 
                        ? 
                        <div className="card mt-2">
                            <div className="card-header">
                                HTTP
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <SBLabel labelFor={'host'} labelText={'Host'} isRequired={true} />
                                        <input type='text' className="form-control" id="host" name="transport.http.host" value={inputData.transport?.http?.host ?? ''} onChange={handleFieldChange} required />
                                    </div>
                                    <div className="col-md-4">
                                        <SBLabel labelFor={'port'} labelText={'Port'} isRequired={true} />
                                        <input type='number' className="form-control" id="port" name="transport.http.port" value={inputData.transport?.http.port ?? ''} onChange={handleFieldChange} required/>
                                    </div>
                                    <div className="col-md-4">
                                        <SBLabel labelFor={'http_api_endpoint'} labelText={'API Endpoint'} isRequired={true} />
                                        <input type='text' className="form-control" id="http_api_endpoint" name="transport.http.api_endpoint" value={inputData.transport?.http?.api_endpoint ?? ''} onChange={handleFieldChange} required />                                        
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <SBLabel labelFor="http_username" labelText="Username"></SBLabel>
                                        <input type='text' className="form-control" id="http_username" name="transport.http.username" value={inputData.transport?.http?.username ?? ''} onChange={handleFieldChange} />                                        
                                    </div>
                                    <div className="col-md-4">
                                        <SBLabel labelFor="http_password" labelText="Password"></SBLabel>
                                        <div className="input-group mb-3">
                                            <input className={showPassword ? "form-control text-secure" : "form-control"} id="http_password" type='text' name="transport.http.password" autoComplete="off" value={inputData.transport?.http?.password ?? ''} onChange={handleFieldChange} required />
                                            <button className="btn btn-secondary" type="button" id="show_hide_pw" title="Show / hide password" onClick={toggleShowPw}>
                                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}></FontAwesomeIcon>
                                            </button>
                                        </div>
                                    </div>                           
                                </div>                                
                            </div>                    
                        </div>
                        :
                        <span></span>
                    }

                    { inputData.transport?.protocol?.includes("MQTT") 
                        ?
                        <div className="card mt-2">
                            <div className="card-header">
                                MQTT
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <SBLabel labelFor="mqtt_broker" labelText="Broker"></SBLabel>
                                        <input type='text' className="form-control" id="mqtt_broker" name="transport.mqtt.broker" value={inputData.transport?.mqtt?.broker ?? ''} onChange={handleFieldChange} required />
                                    </div>
                                    <div className="col-md-4">
                                        <SBLabel labelFor="mqtt_port" labelText="Port"></SBLabel>
                                        <input type='number' className="form-control" id="mqtt_port" name="transport.mqtt.port" value={inputData.transport?.mqtt?.port ?? ''} onChange={handleFieldChange} required/>                                        
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <SBLabel labelFor="mqtt_pub_topics" labelText="Publish to Topics" labelValue={inputData.transport.mqtt?.pub_topics}></SBLabel>
                                        <SBGroupList id="mqtt_pub_topics" data={inputData.transport.mqtt?.pub_topics} useInput={true}></SBGroupList>
                                    </div>
                                    <div className="col-md-4">
                                        <SBLabel labelFor="mqtt_sub_topics" labelText="Subscibe to Topics" labelValue={inputData.transport.mqtt?.sub_topics}></SBLabel>
                                    </div>
                                </div>
                            </div>                    
                        </div>
                        :
                        <span></span>
                    }                    

                    <br/>
                    <pre>{JSON.stringify(inputData, null, 2)}</pre>                    

                {/* <div className="card mt-2">
                    <div className="card-header">
                        Transport
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <SBLabel labelFor={'protocol'} labelText={'Protocol'} isRequired={true} />
                                <select required className="form-select" id="protocol" name="transport.protocol" value={inputData.transport?.protocol ?? ''} onChange={handleFieldChange}>
                                    <option value=''>Choose...</option>
                                    {PROTOCOL_LIST.map((s: any) => <option key={s} value={s} >{s}</option>)}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <SBLabel labelFor={'host'} labelText={'Host'} isRequired={true} />
                                <input type='text' className="form-control" id="host"
                                    name="transport.host" value={inputData.transport?.host ?? ''} onChange={handleFieldChange} required />
                            </div>
                            <div className="col-md-4">
                                <SBLabel labelFor={'port'} labelText={'Port'} isRequired={true} />
                                <input type='number' className="form-control" id="port"
                                    name="transport.port" value={inputData.transport?.port ?? ''} onChange={handleFieldChange} required/>
                            </div>
                        </div>
                        <div className="form-row mt-2">
                            <SBLabel labelFor={'serialization'} labelText={'Serialization'} isRequired={true} />
                            <MultiSelect required id='serialization' fieldOpts={SERIALIZATION_LIST} name="transport.serialization" value={inputData.transport?.serialization ?? []} onchange={handleChange} />
                        </div>                        
                    </div>
                </div>                     */}

                {/* <div className="row">
                    <h6 style={{ fontWeight: 'bold' }}>HTTPS options </h6>
                    <div className="col">
                        <label htmlFor="path">Path</label>
                        <input type='text' className="form-control" id="path"
                            pattern="^[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$"
                            name="transport.https_path" value={inputData.transport?.https_path ?? ''} onChange={handleFieldChange} />
                        <small className="text-muted">Default: "/"</small>
                    </div>
                    <div className="col">
                        <label htmlFor="security">Security</label>
                        <select className="form-select" id="security" name="transport.https_security" value={inputData.transport?.https_security ?? 'Development'} onChange={handleFieldChange}>
                            <option value='Production'>Production</option>
                            <option value='Development'>Development</option>
                        </select>
                        <div>
                            <p className="text-muted"><small>Default: "Development"</small></p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <h6 style={{ fontWeight: 'bold' }}>Authentication </h6>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="username">Username</label>
                            <input type='text' className="form-control" id="username" name="transport.auth.username" value={inputData.transport?.auth?.username ?? ''} onChange={handleFieldChange} />
                        </div>
                        <div className="col">
                            <label htmlFor="password">Password</label>
                            <input type='password' className="form-control" id="password" autoComplete="off" name="transport.auth.password" value={inputData.transport?.auth?.password ?? ''} onChange={handleFieldChange} />
                        </div>
                        <div className="col">
                            <label htmlFor="password">Confirm Password</label>
                            <input type='password' className="form-control" id="password_confirmation" name="password_confirmation" autoComplete="off" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="ca_cert">CA Certificate</label>
                            <input type='file' className="form-control" id="ca_cert" name="transport.auth.ca_cert" value={inputData.transport?.auth?.ca_cert ?? ''} onChange={handleFieldChange} />
                        </div>
                        <div className="col">
                            <label htmlFor="client_cert">Client Certificate</label>
                            <input type='file' className="form-control" id="client_cert" name="transport.auth.client_cert" value={inputData.transport?.auth?.client_cert ?? ''} onChange={handleFieldChange} />
                        </div>
                        <div className="col">
                            <label htmlFor="client_key">Client Key</label>
                            <input type='file' className="form-control" id="client_key" name="transport.auth.client_key" value={inputData.transport?.auth?.client_key ?? ''} onChange={handleFieldChange} />
                        </div>
                    </div>
                </div> */}
                   
                </form>
            </div>
        </div>
    );
}
export default DeviceCreator;