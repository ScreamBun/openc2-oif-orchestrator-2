import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NAV_ABOUT, NAV_ACTUATOR, NAV_ACTUATOR_CREATOR, NAV_ACTUATOR_EDIT, NAV_ACTUATOR_LIST, NAV_COMMAND, NAV_COMMAND_GENERATOR, NAV_COMMAND_LIST, NAV_DEVICE, NAV_DEVICE_CREATOR, NAV_DEVICE_EDIT, NAV_DEVICE_LIST, NAV_HOME } from '../nav/consts';
import AppLayout from '../nav/AppLayout';
import Home from '../nav/Home';
import About from '../nav/About';
import DeviceDetails from '../features/devices/DeviceDetails';
import DeviceCreator from '../features/devices/DeviceCreator';
import DeviceList from '../features/devices/DeviceList';
import ActuatorCreator from '../features/actuators/ActuatorCreator';
import ActuatorDetails from '../features/actuators/ActuatorDetails';
import ActuatorList from '../features/actuators/ActuatorList';
import CommandDetails from '../features/commands/CommandDetails';
import CommandGenerator from '../features/commands/CommandGenerator';
import MessageList from '../features/commands/MessageList';


function App() {
  debugger;
  return (
    <div className="container-fluid">
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path={NAV_HOME} element={<Home />} />
            <Route path={NAV_DEVICE_LIST} element={<DeviceList />} />
            <Route path={NAV_DEVICE_CREATOR} element={<DeviceCreator />} />
            <Route path={NAV_DEVICE} element={<DeviceDetails />} />
            <Route path={NAV_DEVICE_EDIT} element={<DeviceCreator />} />

            <Route path={NAV_ACTUATOR_LIST} element={<ActuatorList />} />
            <Route path={NAV_ACTUATOR_CREATOR} element={<ActuatorCreator />} />
            <Route path={NAV_ACTUATOR} element={<ActuatorDetails />} />
            <Route path={NAV_ACTUATOR_EDIT} element={<ActuatorCreator />} />

            <Route path={NAV_COMMAND_LIST} element={<MessageList />} />
            <Route path={NAV_COMMAND_GENERATOR} element={<CommandGenerator />} />
            <Route path={NAV_COMMAND} element={<CommandDetails />} />

            <Route path={NAV_ABOUT} element={<About />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
