import React, { useState } from "react";
import { faX, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import { NAV_ACTUATOR_LIST } from "../../nav/consts";
import SBEditor from "../common/SBEditor";
import { Actuator, Device } from "../../services/types";
import { useAddNewActuatorMutation, useEditActuatorMutation, useGetActuatorbyIDQuery, useGetAllDevicesQuery } from "../../services/apiSlice";
import { sbToastError } from "../common/SBToast";

const initialState: Actuator = {
    name: "",
    parent_device: "",
    schema: undefined
}

const ActuatorCreator = () => {
    const { actuatorID } = useParams<{ actuatorID: string }>();
    const goto = useNavigate();
    const { data: parent_device_opts } = useGetAllDevicesQuery();

    const { data: actuator, isLoading, error } = useGetActuatorbyIDQuery(`${actuatorID}`);
    const [inputData, setInputData] = useState(actuator ? actuator : initialState);

    const [isEditing, setIsEditing] = useState(actuator ? true : false);
    const [addNewActuator, { isLoading: isFetching }] = useAddNewActuatorMutation();

    const [updateActuator, { isLoading: isUpdating }] = useEditActuatorMutation();

    //TODO: schema preview -- Toggle?
    const handleSchemaFile = () => {
        //if file is selected, read data to SBEditor
        //set inputData.schema
    }

    const onSave = async () => {
        if (isEditing) {
            await updateActuator(inputData).unwrap()
                .then(() => {
                    setIsEditing(false);
                    goto(`${NAV_ACTUATOR_LIST}/${actuatorID}`);
                })
                .catch((err) => {
                    console.log(err);
                    sbToastError(`Error: Update Actuator Failed`);
                    return;
                })
        } else {
            //TODO: validation - if id exists already, prevent add
            await addNewActuator(inputData).unwrap()
                .then(() => {
                    setInputData(initialState);
                    goto(`${NAV_ACTUATOR_LIST}`); // go to created device details ? 
                })
                .catch((err) => {
                    console.log(err);
                    sbToastError(`Error: Create Actuator Failed`);
                    return;
                })
        }
    }

    const onCancel = () => {
        goto(-1);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const key = e.target.name;
        const value = e.target.value;

        setInputData((values: any) => ({ ...values, [key]: value }))
    }

    return (
        <div className="card">
            <div className="card-header">
                <div className='row'>
                    <div className='col-9 my-auto'>
                        Actuator Creator
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
                <div className="row mb-2">
                    <div className="col">
                        <label htmlFor="name">Name</label>
                        <input type='text' className="form-control" id="name" name="name" value={inputData.name} onChange={handleChange} />
                    </div>
                    <div className="col">
                        <label htmlFor="id">Actuator ID</label>
                        <input type='uuid' className="form-control" id="id" name="id" value={inputData.id} onChange={handleChange} />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="parentDevice">Parent Device</label>
                        <select className="form-select" id="parentDevice" value={inputData.parent_device} onChange={handleChange} >
                            <option value="">Choose...</option>
                            {parent_device_opts?.map((device: Device) => <option key={device.id} value={device.id} >{device.name}</option>)}
                        </select>
                    </div>
                    <div className="col">
                        <h6>Profile?</h6>
                        <p>Insert Here</p>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col">
                        <label htmlFor="schema">Schema</label>
                        <input type='file' className="form-control" id="schema" name="schema" onChange={handleSchemaFile} />
                        <SBEditor data={inputData.schema} />
                    </div>
                </div>
                <hr />
                <div className="form-row">
                    <label htmlFor="notes">Notes</label>
                    <textarea className="form-control" id="notes" name="notes" value={inputData.note} onChange={handleChange}></textarea>
                </div>
            </div>
        </div >
    );
}
export default ActuatorCreator; 