//TODO: decide link to logo
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { NAV_HOME, NAV_ABOUT, NAV_DEVICE_LIST, NAV_ACTUATOR_LIST, NAV_COMMAND_GENERATOR, NAV_COMMAND_LIST, NAV_EXTERNAL_OIF } from './consts';
import { NavLink, Outlet } from 'react-router-dom';

const AppLayout = () => {

    return (
        <div>
            <nav className='navbar navbar-expand-md navbar-dark bg-primary fixed-top py-0'>
                <div className='container-fluid'>
                    <div className='collapse navbar-collapse'>
                        <a className='navbar-brand' href={NAV_EXTERNAL_OIF} target='_blank' rel="noreferrer">
                            <span className='font-weight-bold font-italic mx-2'>OIF</span>
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
                            <li className="nav-item dropdown">
                                <button className="nav-link dropdown-toggle btn-link btn" id="navbarDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Commands
                                </button>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <NavLink className='dropdown-item' to={NAV_COMMAND_GENERATOR}> Command Generator </NavLink>
                                    <NavLink className='dropdown-item' to={NAV_COMMAND_LIST}> Command History </NavLink>
                                </div>
                            </li>
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

            <nav className='navbar navbar-dark bg-secondary fixed-bottom py-1'>
                <small>v1.0.0</small>
            </nav>

            <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={4000} theme='colored' />
        </div >
    );
}

export default AppLayout;