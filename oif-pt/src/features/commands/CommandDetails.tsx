import React from "react";
import { useParams } from "react-router-dom";
import { useGetCommandbyIDQuery } from "../../services/apiSlice";
import { DeleteBtn } from "../common/CRUDbtn";

const CommandDetails = () => {
    const { commandID } = useParams<{ commandID?: string }>();
    const { data: command, isLoading, error } = useGetCommandbyIDQuery(`${commandID}`);
    //delete

    if (!command) {
        return (
            <div className="card">
                <div className="card-header">
                    <div className='row'>
                        <div className='col-9 my-auto'>
                            Command Details
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <span style={{ color: 'red' }}> ERROR: Command {commandID} does not exist. </span>
                </div>
            </div>
        );

    } else {
        return (
            <div className="card">
                <div className="card-header">
                    <div className='row'>
                        <div className='col-9 my-auto'>
                            Command Details
                        </div>
                        <div className='col-3'>
                            <DeleteBtn id={command.id} type={'command'} />
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <h6>Command ID</h6>
                            <p>{command.id}</p>
                        </div>
                        <div className="col">
                            <h6>Received</h6>
                            <p>{command.received_date}</p>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col">
                            <h6 style={{ fontWeight: 'bold' }}>Actuators</h6>
                            <p>{command.actuators}</p>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col">
                            <h6 style={{ fontWeight: 'bold' }}>Command</h6>
                            <p>{command.command}</p>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col">
                            <h6 style={{ fontWeight: 'bold' }}>Response</h6>
                            <p style={{ fontWeight: 'bold' }}> Response Status: </p>
                            <p>{command.response_status}</p>
                            <p style={{ fontWeight: 'bold' }}> Response Text: </p>
                            <p>{command.response_text}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default CommandDetails; 