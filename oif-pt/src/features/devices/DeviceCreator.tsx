//TODO: make modal?
import { faSave, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NAV_DEVICE_LIST, PROTOCOL_LIST, SERIALIZATION_LIST } from "../../nav/consts";
import { useAddNewDeviceMutation, useEditDeviceMutation, useGetDevicebyIDQuery } from "../../services/apiSlice";
import { Device } from "../../services/types";
import MultiSelect from "../common/MultiSelect";
import { sbToastError, sbToastSuccess } from "../common/SBToast";

const initialState: Device = {
    device_id: '',
    name: '',
    transport: {
        protocol: '',
        host: '',
        port: undefined,
        serialization: [],
        https_path: '/',
        https_security: 'Development',
        auth: {
            username: '',
            password: '',
            ca_cert: '',
            client_cert: '',
            client_key: ''
        }
    },
    note: ''
}

const DeviceCreator = () => {
    const { deviceID } = useParams<{ deviceID: string }>();
    const goto = useNavigate();

    const { data: device, isLoading, error } = useGetDevicebyIDQuery(`${deviceID}`);
    const [inputData, setInputData] = useState(device ? device : initialState);

    const [isEditing, setIsEditing] = useState(device ? true : false);
    const [addNewDevice, { isLoading: isFetching }] = useAddNewDeviceMutation();

    const [updateDevice, { isLoading: isUpdating }] = useEditDeviceMutation();

    const onSave = async () => {
        if (isEditing) {
            await updateDevice(inputData).unwrap()
                .then(() => {
                    setIsEditing(false);
                    sbToastSuccess(`Successfully updated Device`)
                    goto(`${NAV_DEVICE_LIST}/${deviceID}`);
                })
                .catch((err) => {
                    console.log(err);
                    sbToastError(`Error: Update Device Failed`);
                    return;
                })

        } else {
            //TODO: validation - if id exists already, prevent add
            await addNewDevice(inputData).unwrap()
                .then(() => {
                    setInputData(initialState);
                    sbToastSuccess(`Successfully created Device`)
                    goto(`${NAV_DEVICE_LIST}`); // go to created device details ? 
                })
                .catch((err) => {
                    console.log(err);
                    sbToastError(`Error: Create Device Failed`);
                    return;
                })
        }
    }

    const onCancel = () => {
        goto(-1);
    }

    const handleChange = (fieldName: string, fieldValue: any) => {
        var key: string;
        if (fieldName.includes(".")) {
            const keys = fieldName.split('.');
            key = keys[keys.length - 1];
        }

        if (fieldName.includes("transport") && !fieldName.includes("auth")) {
            setInputData((values: any) => ({ ...values, transport: { ...values.transport, [key]: fieldValue } }))

        } else if (fieldName.includes("auth")) {
            setInputData((values: any) => ({ ...values, transport: { ...values.transport, auth: { ...values.transport.auth, [key]: fieldValue } } }))

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
    //TODO: validation - password confirmation if adding/changing pswd
    if (isLoading) {
        return (
            <div className="card">
                <div className="card-header">
                    <div className='row'>
                        <div className='col-9 my-auto'>
                            {isEditing ? 'Device Editor' : 'Device Creator'}
                        </div>
                        <div className='col-3'>
                            <button type="button" className="btn btn-sm btn-secondary ms-2 float-end" title="Cancel" onClick={onCancel}>
                                <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
                            </button>
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
                        {isEditing ? `Device Editor : ${deviceID}` : 'Device Creator'}
                    </div>
                    <div className='col-3'>
                        <button type="button" className="btn btn-sm btn-secondary ms-2 float-end" title="Cancel" onClick={onCancel}>
                            <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
                        </button>
                        <button type="button" className="btn btn-sm btn-success float-end" title="Save" onClick={onSave}>
                            <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>
                        </button>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <form onSubmit={onSave}>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="name">Name<span style={{ color: 'red' }}>*</span></label>
                            <input type='text' className="form-control" id="name" name="name" value={inputData.name ?? ''} onChange={handleFieldChange} required />
                        </div>
                        <div className="col">
                            <label htmlFor="device_id">Device ID<span style={{ color: 'red' }}>*</span></label>
                            <input type='text' className={`form-control${isEditing ? '-plaintext' : ''}`} readOnly={isEditing ? true : false}
                                id="device_id" name="device_id" value={inputData.device_id ?? ''} onChange={handleFieldChange} required/>
                        </div>
                    </div>

                    <hr />
                    <h5>Transports</h5>
                    <div>
                        <div className="row mb-2">
                            <h6 style={{ fontWeight: 'bold' }}>Connection</h6>
                            <div className="col">
                                <label htmlFor="protocol">Protocol</label>
                                <select className="form-select" id="protocol" name="transport.protocol" value={inputData.transport?.protocol ?? ''} onChange={handleFieldChange}>
                                    <option value=''>Choose...</option>
                                    {PROTOCOL_LIST.map((s: any) => <option key={s} value={s} >{s}</option>)}
                                </select>
                            </div>
                            <div className="col">
                                <label htmlFor="host">Host</label>
                                <input type='text' className="form-control" id="host"
                                    name="transport.host" value={inputData.transport?.host ?? ''} onChange={handleFieldChange} />
                            </div>
                            <div className="col">
                                <label htmlFor="port">Port<span style={{ color: 'red' }}>*</span></label>
                                <input type='number' className="form-control" id="port"
                                    name="transport.port" value={inputData.transport?.port ?? ''} onChange={handleFieldChange} required/>
                            </div>
                        </div>
                        <div className="form-row mb-2">
                            <h6 style={{ fontWeight: 'bold' }}>Serialization</h6>
                            <MultiSelect fieldOpts={SERIALIZATION_LIST} name="transport.serialization" value={inputData.transport?.serialization ?? []} onchange={handleChange} />
                        </div>
                        <div className="row">
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
                        </div>
                        <hr />
                        <div className="form-row">
                            <label htmlFor="note">Notes</label>
                            <textarea className="form-control" id="notes" name="note" value={inputData.note ?? ''} onChange={handleFieldChange}></textarea>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default DeviceCreator;