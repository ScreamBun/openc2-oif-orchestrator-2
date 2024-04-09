//TODO: add pagination
import { Link } from "react-router-dom";
import { NAV_DEVICE_CREATOR, NAV_DEVICE_LIST } from "../../nav/consts";

import { CreateBtn } from "../common/CrudBtn";
import { useGetAllDevicesQuery } from "../../services/apiSlice";
import { Device } from "../../services/types";


const DeviceList = () => {
    const {
        data: devices,
        isLoading,
        error
    } = useGetAllDevicesQuery();

    if (isLoading) {
        return (
            <div className="card">
                <div className="card-header">
                    <div className='row'>
                        <div className='col-9 my-auto'>
                            List of Devices
                        </div>
                        <div className="col-3">
                            <CreateBtn link={NAV_DEVICE_CREATOR} />
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <span className="text-muted"> Loading... </span>
                </div>
            </div>
        );
    }

    if (!devices || devices.length === 0 || error) {
        return (
            <div className="card">
                <div className="card-header">
                    <div className='row'>
                        <div className='col-9 my-auto'>
                            List of Devices
                        </div>
                        <div className="col-3">
                            <CreateBtn link={NAV_DEVICE_CREATOR} />
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <span style={{ color: 'red' }}> {error ? `${error}` : 'ERROR: No Devices exist.'} </span>
                </div>
            </div>
        );
    }

    const rowsofDevices = devices.map((device: Device) =>
        <tr key={device.id}>
            <th scope="row">{device.device_id}</th>
            <td>{device.name}</td>
            <td>
                <button type="button" className="btn btn-sm btn-info">
                    <Link to={`${NAV_DEVICE_LIST}/${device.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        See Device Details
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
                        List of Devices
                    </div>
                    <div className="col-3">
                        <CreateBtn link={NAV_DEVICE_CREATOR} />
                    </div>
                </div>
            </div>
            <div className="card-body">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Device ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rowsofDevices}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default DeviceList; 