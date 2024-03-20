import React, { useEffect, useState } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { githubDark } from '@uiw/codemirror-themes-all';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useSendCommandMutation } from "../../services/apiSlice";
import { sbToastError, sbToastSuccess } from "../common/SBToast";
import { Command } from "../../services/types";
import SBSubmitBtn from "../common/SBSubmitBtn";

const CommandGenerator = () => {
    // const [loadedSchema, setLoadedSchema] = useState('');
    // const [msgTypeOpts, setMsgTypeOpts] = useState([]);
    const [cmd, setCmd] = useState('');  
    const [isSending, setIsSending] = useState(false);  

    const [sendCommand, { isLoading }] = useSendCommandMutation();
    const formId = "command_form";

    const sbEditorOnChange = (cmd: string) => {
        // setMsg(JSON.stringify(msg, null, 2));
        setCmd(cmd);
    }

    const onSendClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('cmd: ' + JSON.stringify(cmd, null, 2));

        const command: Command = {
            id: "",
            sent_date: "",
            actuator_id: "",
            command: cmd,
            status: ""
        }        

        setIsSending(true);
        await sendCommand(command).unwrap()
            .then(() => {
                setIsSending(false);
                console.log('command sent!');
                sbToastSuccess(`Command sent`);
            })
            .catch((err) => {
                setIsSending(false);
                console.log(err);
                sbToastError(`Error: Unable to send command`);
                return;
            })

    }

    return (
        <div className="card">
            <div className="card-header">
                Commands
            </div>
            <div className="card-body">

                <div className='row'>
                    <div className='col-md-7'>
                        <div className="card">
                            <div className="card-header">
                                <span className="align-middle">Command Generator</span>
                                {/* <button type="button" className="btn btn-sm btn-success float-end" title="Send" onClick={onSendClick}>
                                    <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                                </button> */}
                                <SBSubmitBtn buttonId="sendCommandBtn" 
                                    buttonTitle="Send command" 
                                    buttonTxt=""
                                    customClass="float-end"                                    
                                    isLoading={isSending}
                                    formId={formId}
                                    isDisabled={Object.keys(cmd).length !== 0 && cmd.length !== 0 ? false : true}>
                                </SBSubmitBtn>
                            </div>
                            <div className="card-body p-0">
                                <form id={formId} onSubmit={onSendClick}>
                                    <CodeMirror
                                        value={ cmd }
                                        height="40vh"
                                        maxHeight='100%'
                                        onChange={ sbEditorOnChange }
                                        readOnly={ false }
                                        theme={ githubDark }
                                        extensions={ [langs.json()] }
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-5'>
                        <div className="card">
                            <div className="card-header">
                                <span>History</span>
                            </div>
                            <div className="card-body p-0">
                                <ul className="list-group">
                                    <li className="list-group-item list-group-item d-flex justify-content-between align-items-start">A new msg <span className="badge text-bg-primary rounded-pill">Sent</span></li>
                                    <li className="list-group-item list-group-item d-flex justify-content-between align-items-start">A second msg <span className="badge text-bg-danger rounded-pill">Failed</span></li>
                                    <li className="list-group-item list-group-item d-flex justify-content-between align-items-start">A third msg <span className="badge text-bg-success rounded-pill">Received</span></li>
                                    <li className="list-group-item list-group-item d-flex justify-content-between align-items-start">A fourth msg <span className="badge text-bg-success rounded-pill">Received</span></li>
                                    <li className="list-group-item list-group-item d-flex justify-content-between align-items-start">And a fifth msg <span className="badge text-bg-success rounded-pill">Received</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>                    
                </div>
                <div className='row pt-2'>
                    <div className='col-md-12'>
                        <div className="card">
                            <div className="card-header">
                                Details
                            </div>
                            <div className="card-body">

                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className="card">
                                            <div className="card-header">
                                                Message
                                            </div>
                                            <div className="card-body">

                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="card">
                                            <div className="card-header">
                                                Results
                                            </div>
                                            <div className="card-body">

                                            </div>
                                        </div>
                                    </div>                            
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className='row'>
                    <div className='col-md-6 pr-1'>
                        <SchemaLoader
                            loadedSchema={loadedSchema} setLoadedSchema={setLoadedSchema}
                            msgTypeOpts={msgTypeOpts} setMsgTypeOpts={setMsgTypeOpts} />
                    </div>
                    <div className='col-md-6 pl-1'>
                        <CommandCreator
                            loadedSchema={loadedSchema} msgTypeOpts={msgTypeOpts} />
                    </div>
                </div> */}
            </div>
        </div>
    );
}
export default CommandGenerator; 