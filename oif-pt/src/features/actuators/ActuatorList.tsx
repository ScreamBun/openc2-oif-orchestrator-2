import { Link } from "react-router-dom";
import { NAV_ACTUATOR_CREATOR, NAV_ACTUATOR_LIST } from "../../nav/consts";
import { useGetAllActuatorsQuery } from "../../services/apiSlice";
import { SBCreateBtn } from "../common/CRUDBtns";

const ActuatorList = () => {
    const {
        data: actuators,
        isLoading,
        error
    } = useGetAllActuatorsQuery();

    if (isLoading) {
        return (
            <div className="card">
                <div className="card-header">
                    <div className='row'>
                        <div className='col-9 my-auto'>
                            List of Actuators
                        </div>
                        <div className="col-3">
                            <SBCreateBtn link={NAV_ACTUATOR_CREATOR} />
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <span className="text-muted"> Loading... </span>
                </div>
            </div>
        );
    }

    if (!actuators || actuators.length === 0 || error) {
        return (
            <div className="card">
                <div className="card-header">
                    <div className='row'>
                        <div className='col-9 my-auto'>
                            List of Actuators
                        </div>
                        <div className="col-3">
                            <SBCreateBtn link={NAV_ACTUATOR_CREATOR} />
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <span style={{ color: 'red' }}> {error ? `${error}` : 'ERROR: No Actuators exist.'} </span>
                </div>
            </div>
        );
    } else {
        const rowsofActuators = actuators.map(actuator =>
            <tr key={actuator.id}>
                <th scope="row">{actuator.id}</th>
                <td>{actuator.name}</td>
                <td>{actuator.parent_device}</td>
                <td>{actuator.profile}</td>
                <td>
                    <button type="button" className="btn btn-sm btn-info">
                        <Link to={`${NAV_ACTUATOR_LIST}/${actuator.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            See Actuator Details
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
                            List of Actuators
                        </div>
                        <div className="col-3">
                            <SBCreateBtn link={NAV_ACTUATOR_CREATOR} />
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Parent Device</th>
                                <th scope="col">Profile</th>
                                <th scope="col">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rowsofActuators}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default ActuatorList; 