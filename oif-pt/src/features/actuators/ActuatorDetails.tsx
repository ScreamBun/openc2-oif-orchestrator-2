import React from "react";
import { useNavigate, useParams } from "react-router";
import FileOptBtn from "../common/FileOptBtn";
import { DeleteBtn, EditBtn } from "../common/CRUDbtn";
import { useGetActuatorbyIDQuery, useRemoveActuatorMutation } from "../../services/apiSlice";
import { NAV_ACTUATOR_LIST } from "../../nav/consts";

const ActuatorDetails = () => {
    const { actuatorID } = useParams<{ actuatorID: string }>();
    const goto = useNavigate();
    const { data: actuator, isLoading, error } = useGetActuatorbyIDQuery(`${actuatorID}`);

    const [deleteActuator, { isLoading: isDeleting }] = useRemoveActuatorMutation();
    const onDelete = () => {
        deleteActuator(`${actuatorID}`);
        goto(NAV_ACTUATOR_LIST);
    }

    //TODO: schema preview
    if (isLoading) {
        return (
            <div className="card">
                <div className="card-header">
                    <div className='row'>
                        <div className='col-9 my-auto'>
                            Actuator Details
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <span className="text-muted"> Loading... </span>
                </div>
            </div>
        );
    }

    if (!actuator || error) {
        return (
            <div className="card">
                <div className="card-header">
                    <div className='row'>
                        <div className='col-9 my-auto'>
                            Actuator Details
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <span style={{ color: 'red' }}> {error ? `${error}` : `ERROR: Actuator ${actuatorID} does not exist.`} </span>
                </div>
            </div>
        );
    }
    return (
        <div className="card">
            <div className="card-header">
                <div className='row'>
                    <div className='col-9 my-auto'>
                        Actuator Details
                    </div>
                    <div className='col-3'>
                        <DeleteBtn id={actuator.id} type={'actuator'} onDelete={onDelete} disabled={isDeleting} />
                        <EditBtn link={`/actuators/${actuatorID}/edit/`} />
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <h6>Name</h6>
                        <p>{actuator.name}</p>
                    </div>
                    <div className="col">
                        <h6>Actuator ID</h6>
                        <p>{actuator.id}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <h6>Parent Device</h6>
                        <p>{actuator.parent_device}</p>
                    </div>
                    <div className="col">
                        <h6>Profile?</h6>
                        <p>{actuator.profile}</p>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col-9">
                                <h6 style={{ fontWeight: 'bold' }}>Schema</h6>
                            </div>
                            <div className="col-3">
                                <FileOptBtn data={'schema'} />
                            </div>
                        </div>
                        <div className="row"></div>
                        <p>{actuator.schema}</p>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <h6 style={{ fontWeight: 'bold' }}>Notes</h6>
                    <p>{actuator.note}</p>
                </div>
            </div>
        </div>
    );
}
export default ActuatorDetails; 