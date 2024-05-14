import { Link } from "react-router-dom";
import { NAV_DEVICE_CREATOR, NAV_DEVICE_LIST } from "../../nav/consts";

import { SBCreateBtn, SBDeleteBtn } from "../common/CRUDBtns";
import { useGetAllDevicesQuery, useRemoveDeviceMutation } from "../../services/apiSlice";
import { Device } from "../../services/types";
import { sbToastError } from "../common/SBToast";


const DeviceList = () => {
    const { data: devices = [], isLoading, error } = useGetAllDevicesQuery();
    const [removeDevice] = useRemoveDeviceMutation(); 

    if (isLoading) {
        return (
            <div className="card">
                <div className="card-header">
                    <div className='row'>
                        <div className='col-9 my-auto'>
                            Devices
                        </div>
                        <div className="col-3">
                            <SBCreateBtn link={NAV_DEVICE_CREATOR} />
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
                            Devices
                        </div>
                        <div className="col-3">
                            <SBCreateBtn link={NAV_DEVICE_CREATOR} />
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <span style={{ color: 'red' }}> {error ? `${error}` : 'ERROR: No Devices exist.'} </span>
                </div>
            </div>
        );
    }

    const onRemove = async (id: string | undefined, name: string | undefined) => {
        if (id){
            await removeDevice(id).unwrap()
            .then((data) => {})
            .catch((err) => {
                console.log(err);
                sbToastError(`Error: Unable to remove device`);
                return;
            });            
        }
    }    

    const rowsofDevices = devices.map((device: Device) =>
        <tr key={device.id}>
            <td>
                <Link to={`${NAV_DEVICE_LIST}/${device.id}`}>
                    {device.name}
                </Link>    
            </td>
            <td>{device.device_id}</td>
            <td>{device.transport.protocol}</td>
            <td>{device.transport.serialization}</td>
            <td>
                <SBDeleteBtn id={'delete'+device.id} type={device.name} onDelete={() => {onRemove(device.id, device.name)}} customClass='ms-2 float-end' />                                
                {/* <button type="button" className="btn btn-sm btn-primary ms-2 float-end" title="Create Duplicate">
                    <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>
                </button>                 */}
            </td>
        </tr >
    );

    return (
        <div className="card">
            <div className="card-header">
                <div className="row">
                    <div className="col-9 my-auto p-1">
                        Devices
                    </div>
                    <div className="col-3">
                        <SBCreateBtn link={NAV_DEVICE_CREATOR} />
                    </div>
                </div>
            </div>
            <div className="card-body p-0">
                <div className="row p-0">
                    <div className="col-md-12">
                        <table className="table table-sm table-bordered table-striped table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Protocol</th>
                                    <th scope="col">Serialization</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {rowsofDevices}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DeviceList; 