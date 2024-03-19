import React from "react";
import { Link } from "react-router-dom";
import { NAV_COMMAND_GENERATOR, NAV_COMMAND_LIST } from "../../nav/consts";
import { CreateBtn } from "../common/CRUDbtn";
import { useGetAllCommandsQuery } from "../../services/apiSlice";

const CommandList = () => {
    const {
        data: commands,
        isLoading,
        error
    } = useGetAllCommandsQuery();
    //TODO: isloading/ error view

    //TODO: fix getting data
    if (!commands || commands.length === 0) {
        return (
            <div className="card">
                <div className="card-header">
                    <div className='row'>
                        <div className='col-9 my-auto'>
                            Command History
                        </div>
                        <div className="col-3">
                            <CreateBtn link={NAV_COMMAND_GENERATOR} />
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <span style={{ color: 'red' }}> ERROR: No Commands exist. </span>
                </div>
            </div>
        );
    } else {
        const rowsofCommands = commands.map(command =>
            <tr key={command.id}>
                <th scope="row">{command.id}</th>
                {/* <td>{command.received_date}</td>
                <td>{command.response_status}</td> */}
                <td>
                    <button type="button" className="btn btn-sm btn-info">
                        <Link to={`${NAV_COMMAND_LIST}/${command.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            See Command Details
                        </Link>
                    </button>
                </td>
            </tr >
        );

        return (
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-9 my-auto">
                            Command History
                        </div>
                        <div className="col-3">
                            <CreateBtn link={NAV_COMMAND_GENERATOR} />
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Received</th>
                                <th scope="col">Status</th>
                                <th scope="col">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rowsofCommands}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default CommandList; 