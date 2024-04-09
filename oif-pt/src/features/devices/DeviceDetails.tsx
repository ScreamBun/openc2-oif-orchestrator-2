import React from "react";
import { DeleteBtn, EditBtn } from "../common/CrudBtn";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDevicebyIDQuery, useRemoveDeviceMutation } from "../../services/apiSlice";
import { NAV_DEVICE_LIST } from "../../nav/consts";

const DeviceDetails = () => {
    const { deviceID } = useParams<{ deviceID: string }>();
    const goto = useNavigate();
    const { data: device, isLoading, error } = useGetDevicebyIDQuery(`${deviceID}`);

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
                            Device Details <span className="text-muted">{deviceID} </span>
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
                    <div className='col-9 my-auto'>
                        Device Details <span className="text-muted"> {deviceID} </span>
                    </div>
                    <div className='col-3'>
                        <DeleteBtn id={deviceID} type={'device'} onDelete={onDelete} disabled={isDeleting} />
                        <EditBtn link={`/devices/${deviceID}/edit/`} />
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <label className="text-muted" htmlFor="name">Name</label>
                        <p> {device.name} </p>
                    </div>
                    <div className="col">
                        <label className="text-muted" htmlFor="id">Device ID</label>
                        <p> {device.device_id} </p>
                    </div>
                </div>
                <hr />
                <h5>Transports</h5>
                <div>
                    <div className="row mb-2">
                        <h6 style={{ fontWeight: 'bold' }}>Connection</h6>
                        <div className="col">
                            <label className="text-muted" htmlFor="protocol">Protocol</label>
                            <p>{device.transport?.protocol}</p>
                        </div>
                        <div className="col">
                            <label className="text-muted" htmlFor="host">Host</label>
                            <p> {device.transport?.host} </p>
                        </div>
                        <div className="col">
                            <label className="text-muted" htmlFor="port">Port</label>
                            <p> {device.transport?.port} </p>
                        </div>
                    </div>
                    <div className="form-row mb-2">
                        <h6 style={{ fontWeight: 'bold' }}>Serialization</h6>
                        <p>
                            {device.transport?.serialization?.map(item => {
                                return (<li key={item}>{item}</li>);
                            })}
                        </p>
                    </div>
                    <div className="row">
                        <h6 style={{ fontWeight: 'bold' }}>HTTPS options </h6>
                        <div className="col">
                            <label className="text-muted" htmlFor="path">Path</label>
                            <p> {device.transport?.https_path} </p>
                        </div>
                        <div className="col">
                            <label className="text-muted" htmlFor="security">Security</label>
                            <p> {device.transport?.https_security} </p>
                        </div>
                    </div>
                    <div className="row">
                        <h6 style={{ fontWeight: 'bold' }}>Authentication </h6>
                        <div className="row">
                            <div className="col">
                                <label className="text-muted" htmlFor="username">Username</label>
                                <p> {device.transport?.auth?.username} </p>
                            </div>
                            <div className="col">
                                <label className="text-muted" htmlFor="password">Password</label>
                                <p> {device.transport?.auth?.password} </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label className="text-muted" htmlFor="ca_cert">CA Certificate</label>
                                <p> {device.transport?.auth?.ca_cert} </p>
                            </div>
                            <div className="col">
                                <label className="text-muted" htmlFor="client_cert">Client Certificate</label>
                                <p> {device.transport?.auth?.client_cert} </p>
                            </div>
                            <div className="col">
                                <label className="text-muted" htmlFor="client_key">Client Key</label>
                                <p> {device.transport?.auth?.client_key} </p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="form-row">
                        <label className="text-muted" htmlFor="notes">Notes</label>
                        <p> {device.note} </p>
                    </div>
                </div>
            </div>
        </div >

    );
}

export default DeviceDetails; 