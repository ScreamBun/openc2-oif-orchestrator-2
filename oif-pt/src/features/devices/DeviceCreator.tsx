import { faEye, faEyeSlash, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NAV_DEVICE_LIST, PROTOCOL_LIST, SERIALIZATION_LIST } from "../../nav/consts";
import { useAddNewDeviceMutation, useEditDeviceMutation, useGetDeviceByIDQuery, useUploadCaCertMutation, useUploadClientCertMutation, useUploadClientKeyMutation } from "../../services/apiSlice";
import { Device, ResponseModel } from "../../services/types";
import { sbToastError } from "../common/SBToast";
import { SBCancelBtn } from "../common/SBCancelBtn";
import { SBLabel } from "../common/SBLabel";
import SBGroupList from "../common/SBGroupList";
import SBFileUpload from "../common/SBFileUpload";


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
    const [prevInputData] = useState(device ? device : initialState);
    const [isEditing, setIsEditing] = useState(device?.id ? true : false);
    const [showHttpPassword, setShowHttpPassword] = useState(true); 
    const [showMqttPassword, setShowMqttPassword] = useState(true); 

    const [formDataCaCertState, setFormDataCaCertState] = useState(new FormData());
    const [formDataClientCertState, setFormDataClientCertState] = useState(new FormData());
    const [formDataClientKeyState, setFormDataClientKeyState] = useState(new FormData());

    const [addNewDevice] = useAddNewDeviceMutation();
    const [updateDevice] = useEditDeviceMutation();
    const [uploadCaCert, { isLoading: isCaCertLoading }] = useUploadCaCertMutation();
    const [uploadClientCert, { isLoading: isClientCertLoading }] = useUploadClientCertMutation();
    const [uploadClientKey, { isLoading: isClientKeyLoading }] = useUploadClientKeyMutation();

    const caCertInputId = "ca_cert";
    const clientCertInputId = "client_cert";
    const clientKeyInputId = "client_key";

    const waitOnCerts = (goToWhenDone: string) => {        
        setTimeout(() => {  
          console.log('waiting for certs to load...');  
          if (isCaCertLoading || isClientCertLoading || isClientKeyLoading) {
            waitOnCerts(goToWhenDone);  
          } else {
            console.log('all certs loaded');
            setIsEditing(false);
            goto(goToWhenDone);
          }
        }, 500)
    }

    const updateCertState = (cert_id: string) => {
        const formData = new FormData();
        const inputCertFile = document.getElementById(cert_id) as HTMLInputElement;

        if (inputCertFile?.files?.item(0)){
            formData.append(cert_id, inputCertFile?.files?.item(0) as File);
        } else {
            formData.append(cert_id, "");
        }

        if (cert_id === caCertInputId){
            setFormDataCaCertState(formData);
        } else if (cert_id === clientCertInputId){
            setFormDataClientCertState(formData);
        } else if (cert_id === clientKeyInputId){
            setFormDataClientKeyState(formData);
        }
    }

    const uploadCerts = async (id: string | undefined, goToWhenDone: string) => {

        // TODO: Check previous state?
        
        if (id === undefined){
            id = ""
        }

        if (formDataCaCertState.has(caCertInputId)){
            await uploadCaCert({id, formData: formDataCaCertState}).unwrap()
            .then(() => {})
            .catch((err) => {
                console.log(err);
                sbToastError(`Error: Failed unable to upload certs`);
                return;
            });            
        }

        if (formDataClientCertState.has(clientCertInputId)){
            await uploadClientCert({id, formData: formDataClientCertState}).unwrap()
            .then(() => {})
            .catch((err) => {
                console.log(err);
                sbToastError(`Error: Failed unable to upload certs`);
                return;
            });
        }

        if (formDataClientKeyState.has(clientKeyInputId)){
            await uploadClientKey({id, formData: formDataClientKeyState}).unwrap()
            .then(() => {})
            .catch((err) => {
                console.log(err);
                sbToastError(`Error: Failed unable to upload certs`);
                return;
            });
        }

        // Wait for all certs to finish loading
        waitOnCerts(goToWhenDone);
    
    }

    const onSave = async () => {

        if (isEditing) {
            await updateDevice(inputData).unwrap()
                .then((rsp: ResponseModel) => {
                    if (!rsp.error){
                        uploadCerts(rsp.data.id, `${NAV_DEVICE_LIST}/${rsp.data.id}`);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    sbToastError(`Error: Failed to update device`);
                    return;
                });
        } else {
            await addNewDevice(inputData).unwrap()
                .then((rsp: ResponseModel) => {
                    if (!rsp.error) {
                        uploadCerts(rsp.data.id, `${NAV_DEVICE_LIST}`);
                    }
                    setInputData(initialState);
                    goto(`${NAV_DEVICE_LIST}`);
                })
                .catch((err) => {
                    console.log(err);
                    sbToastError(`Error: Failed to update device`);
                    return;
                });
        }
    }

    const toggleHttpShowPw = () => { 
        setShowHttpPassword(!showHttpPassword); 
    };   
    
    const toggleMqttShowPw = () => { 
        setShowMqttPassword(!showMqttPassword); 
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
            console.log("transport http")
            setInputData((values: any) => ({ ...values, transport: { ...values.transport, http: { ...values.transport.http, [key]: fieldValue } } }))

        } else if (fieldName.includes("transport") && fieldName.includes("mqtt")) {
            // console.log("transport mqtt")
            setInputData((values: any) => ({ ...values, transport: { ...values.transport, mqtt: { ...values.transport.mqtt, [key]: fieldValue } } }))
            // console.log(JSON.stringify(inputData, null, 2));

        } else {
            setInputData((values: any) => ({ ...values, [fieldName]: fieldValue }))
        }
    }

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const key = e.target.name;
        const value = e.target.value;
        handleChange(key, value);
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
                            <button type="submit" className="btn btn-sm btn-success float-end" title="Save">
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
                <form>

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
                                    <input type='text' className="form-control" id="device_id" name="device_id" value={inputData.device_id ?? ''} onChange={handleFieldChange} required />
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
                                <div className="row mt-2">
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
                                <div className="row mt-2">
                                    <div className="col-md-4">
                                        <SBLabel labelFor="http_username" labelText="Username"></SBLabel>
                                        <input type='text' className="form-control" id="http_username" name="transport.http.username" value={inputData.transport?.http?.username ?? ''} onChange={handleFieldChange} />                                        
                                    </div>
                                    <div className="col-md-4">
                                        <SBLabel labelFor="http_password" labelText="Password"></SBLabel>
                                        <div className="input-group">
                                            <input className={showHttpPassword ? "form-control text-secure" : "form-control"} id="http_password" type='text' name="transport.http.password" autoComplete="off" value={inputData.transport?.http?.password ?? ''} onChange={handleFieldChange} required />
                                            <button className="btn btn-secondary" type="button" id="show_hide_pw" title="Show / hide password" onClick={toggleHttpShowPw}>
                                                <FontAwesomeIcon icon={showHttpPassword ? faEyeSlash : faEye}></FontAwesomeIcon>
                                            </button>
                                        </div>
                                    </div>                           
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-4">
                                        <SBLabel labelFor="http_ca_cert" labelText="CA Cert" labelValue={inputData.transport.http?.ca_cert}></SBLabel>
                                        <SBFileUpload 
                                            fieldId={caCertInputId} 
                                            fieldTitle={"Certificate Authority File Types: .pem, .crt, .ca-bundle, .cer, .p7b, .p7c, .p7s"}
                                            dataKey={"transport.http.ca_cert"} 
                                            dataValue={inputData.transport?.http?.ca_cert}
                                            filesAccepted={".pem, .crt, .ca-bundle, .cer, .p7b, .p7c, .p7s"}
                                            sendChangeToParent={(key: string, name: string) => {handleChange(key, name); updateCertState(caCertInputId);}}
                                        ></SBFileUpload>
                                    </div>
                                    <div className="col-md-4">
                                        <SBLabel labelFor="http_client_cert" labelText="Client Cert" labelValue={inputData.transport.http?.client_cert}></SBLabel>
                                        <SBFileUpload 
                                            fieldId={clientCertInputId} 
                                            fieldTitle={"Client Certificate File Types: .pem, .crt, .ca-bundle, .cer, .p7b, .p7c, .p7s"}
                                            dataKey={"transport.http.client_cert"} 
                                            dataValue={inputData.transport?.http?.client_cert}
                                            filesAccepted={".pem, .crt, .ca-bundle, .cer, .p7b, .p7c, .p7s"}
                                            sendChangeToParent={(key: string, name: string) => {handleChange(key, name); updateCertState(clientCertInputId);}}
                                        ></SBFileUpload>                                        
                                    </div>
                                    <div className="col-md-4">
                                        <SBLabel labelFor="http_client_key" labelText="Client Key" labelValue={inputData.transport.http?.client_key}></SBLabel>
                                        <SBFileUpload 
                                            fieldId={clientKeyInputId} 
                                            fieldTitle={"Keystore File Types: .key, .keystore, .jks"}
                                            dataKey={"transport.http.client_key"} 
                                            dataValue={inputData.transport?.http?.client_key}
                                            filesAccepted={".key, .keystore, .jks"}
                                            sendChangeToParent={(key: string, name: string) => {handleChange(key, name); updateCertState(clientKeyInputId);}}
                                        ></SBFileUpload>                                         
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
                                <div className="row mt-2">
                                    <div className="col-md-4">
                                        <SBLabel labelFor="mqtt_pub_topics" labelText="Publish to Topics"></SBLabel>
                                        <SBGroupList id="mqtt_pub_topics" data={inputData.transport.mqtt?.pub_topics} fieldName="transport.mqtt.pub_topics" useInput={true} onDataChange={handleChange}></SBGroupList>
                                    </div>
                                    <div className="col-md-4">
                                        <SBLabel labelFor="mqtt_sub_topics" labelText="Subscibe to Topics"></SBLabel>
                                        <SBGroupList id="mqtt_sub_topics" data={inputData.transport.mqtt?.sub_topics} fieldName="transport.mqtt.sub_topics" useInput={true} onDataChange={handleChange}></SBGroupList>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-4">
                                        <SBLabel labelFor="mqtt_username" labelText="Username"></SBLabel>
                                        <input type='text' className="form-control" id="mqtt_username" name="transport.mqtt.username" value={inputData.transport?.mqtt?.username ?? ''} onChange={handleFieldChange} />                                        
                                    </div>
                                    <div className="col-md-4">
                                        <SBLabel labelFor="mqtt_password" labelText="Password"></SBLabel>
                                        <div className="input-group mb-3">
                                            <input className={showMqttPassword ? "form-control text-secure" : "form-control"} id="mqtt_password" type='text' name="transport.mqtt.password" autoComplete="off" value={inputData.transport?.mqtt?.password ?? ''} onChange={handleFieldChange} />
                                            <button className="btn btn-secondary" type="button" id="show_hide_mqtt_pw" title="Show / hide password" onClick={toggleMqttShowPw}>
                                                <FontAwesomeIcon icon={showMqttPassword ? faEyeSlash : faEye}></FontAwesomeIcon>
                                            </button>
                                        </div>                                        
                                    </div>                           
                                </div>                                 
                            </div>                    
                        </div>
                        :
                        <span></span>
                    }                    

                    {/* <br/>
                    <pre>{JSON.stringify(inputData, null, 2)}</pre> */}
                   
                </form>
            </div>
        </div>
    );
}
export default DeviceCreator;