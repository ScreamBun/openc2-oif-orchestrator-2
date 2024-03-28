import React, { useState } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { githubDark } from '@uiw/codemirror-themes-all';
import { useSendCommandMutation } from "../../services/apiSlice";
import { sbToastError, sbToastSuccess } from "../common/SBToast";
import { Command } from "../../services/types";
import SBSubmitBtn from "../common/SBSubmitBtn";
import CommsList from "./CommsList";

const CommandGenerator = () => {
    // const [loadedSchema, setLoadedSchema] = useState('');
    // const [msgTypeOpts, setMsgTypeOpts] = useState([]);
    const [cmd, setCmd] = useState('');  
    const [isSending, setIsSending] = useState(false);  
    const [requestId, setRequestId] = useState("zzz");  
    const [viewMessage, setViewMessage] = useState();  

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
            date_created: "",
            request_id: "",
            command: cmd
        }        

        setIsSending(true);
        await sendCommand(command).unwrap()
            .then((data) => {
                setIsSending(false);
                sbToastSuccess(`Command sent, waiting for responses`);
                console.log("request_id: " + JSON.stringify(data))
                setRequestId(data)
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
                        <CommsList requestId={requestId} viewMessage={viewMessage} setViewMessage={setViewMessage}></CommsList>
                    </div>                    
                </div>
                <div className='row pt-2'>
                    <div className='col-md-12'>
                        <div className="card">
                            <div className="card-header">
                                Message Details
                            </div>
                            <div className="card-body">
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className="card">
                                            <div className="card-header">
                                                Message
                                            </div>
                                            <div className="card-body">
                                                <CodeMirror
                                                    value={ viewMessage }
                                                    height="40vh"
                                                    maxHeight='100%'
                                                    onChange={ sbEditorOnChange }
                                                    readOnly={ true }
                                                    theme={ githubDark }
                                                    extensions={ [langs.json()] }
                                                />
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

function getMessages(command: Command) {
    throw new Error("Function not implemented.");
}
