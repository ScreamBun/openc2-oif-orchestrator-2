import { toast, ToastContainer } from 'react-toastify';
import { NAV_HOME, NAV_ABOUT, NAV_DEVICE_LIST, NAV_ACTUATOR_LIST, NAV_COMMAND_GENERATOR, NAV_COMMAND_LIST } from './consts';
import { NavLink, Outlet } from 'react-router-dom';
import OpenC2Logo from '../static/assets/img/conductor_oc2_logo.png';

const AppLayout = () => {

    return (
        <div>
            <nav className='navbar navbar-expand-md navbar-dark bg-primary fixed-top py-0'>
                <div className='container-fluid'>
                    <div className='collapse navbar-collapse'>

                        <a className='navbar-brand' href={NAV_HOME} title='OpenC2 Orchestrator' rel="noreferrer">
                            <img src={OpenC2Logo} alt="OpenC2 Logo" className="img-responsive" />
                        </a>                        

                        <ul className="nav navbar-nav me-auto">
                            <li className="nav-item active">
                                <NavLink className='nav-link px-0' to={NAV_HOME}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='nav-link px-0' to={NAV_DEVICE_LIST}>Devices</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='nav-link px-0' to={NAV_ACTUATOR_LIST}>Actuators</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='nav-link px-0' to={NAV_COMMAND_GENERATOR}>Commands</NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <NavLink className='nav-link px-0' to={NAV_COMMAND_LIST}>Comms History</NavLink>
                            </li>                                                        */}
                        </ul>

                        <ul className="nav navbar-nav navbar-right ms-auto">
                            <li className="nav-item">
                                <NavLink className='nav-link px-0' to={NAV_ABOUT}>About</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >

            <Outlet />

            <br />
            <br />
            <br />

            <nav className='navbar navbar-dark bg-secondary fixed-bottom px-2 py-1'>
                <small>v1.0.0</small>
                <small className='float-right'>OASIS</small>
            </nav>

            <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={4000} theme='colored' />
        </div >
    );
}

export default AppLayout;