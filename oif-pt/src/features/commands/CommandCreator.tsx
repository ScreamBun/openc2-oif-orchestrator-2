import { faX, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Command } from "../../services/types";
import SBEditor from "../common/SBEditor";
//import Generator, { GeneratorChanges } from "react-json-generator";
//ref: "react-json-generator": "https://github.com/ScreamBun/react-json-generator"

const initialState: Command = {
    received_date: "",
    actuators: [],
    command: '',
    response_status: "",
    response_text: ''
}

const CommandCreator = (props: any) => {

    const { loadedSchema, msgTypeOpts } = props;
    const [activeView, setActiveView] = useState('creator');
    const [msgType, setMsgType] = useState('');
    const [cmd, setCmd] = useState(initialState);

    /*  const handleChange = ({ jsObject, isValid, errors }: GeneratorChanges) => {
 
     } */

    const onTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "") {
            setMsgType('');
        } else {
            setMsgType(e.target.value);
            //load msg generator given schema and msg type
        }
    };

    //TODO: send command
    const onSendCommand = () => {
    }

    //TODO: reset/cancel command
    const onResetCommand = () => {
    }


    return (
        <div className="card">
            <div className="card-header p-2">
                <div className="row no-gutters">
                    <div className="col-md-6">
                        <select id="msg-type-list" name="msg-type-list" className="form-control form-control-sm" value={msgType} onChange={onTypeSelect}>
                            <option value="">Select a Message Type...</option>
                            {msgTypeOpts.map((s: any) => <option key={s} value={s} >{s}</option>)}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <div className="nav nav-pill" style={{ display: 'inline' }}>
                            <a className='btn btn-sm btn-info' role="button" data-bs-toggle="tab"
                                onClick={() => setActiveView(`${activeView === 'creator' ? 'generated' : 'creator'}`)}
                                href={`${activeView === 'creator' ? '#generated' : '#creator'}`}>
                                {activeView === 'creator' ? 'See Generated Message' : 'See Generator'}
                            </a>
                        </div>
                        <button type="reset" className="btn btn-sm btn-secondary ms-2 float-end" title="Reset" onClick={onResetCommand}>
                            <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
                        </button>
                        <button type="button" className="btn btn-sm btn-success float-end" title="Send">
                            <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                        </button>
                    </div>
                </div>
            </div>
            <div className="card-body p-0">
                <div style={{ height: '40em' }}>
                    <div className="tab-content">
                        <div className={`tab-pane container ${activeView === 'creator' ? 'active' : ''}`} id="creator">
                            <form id="commandFields" onSubmit={() => onSendCommand}>
                                {/*     <Generator
                                name={msgType}
                                schema={loadedSchema}
                                onChange={handleChange}
                            /> */}
                            </form>
                        </div>
                        <div className={`tab-pane container ${activeView === 'generated' ? 'active' : ''}`} id="generated">
                            <SBEditor data={JSON.stringify(cmd, null, 2)} isReadOnly={true}></SBEditor>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CommandCreator; 