import React, { useState } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { githubDark } from '@uiw/codemirror-themes-all';
import { useSendCommandMutation } from "../../services/apiSlice";
import { sbToastError, sbToastSuccess } from "../common/SBToast";
import { Command } from "../../services/types";
import SBSubmitBtn from "../common/SBSubmitBtn";
import MessageList from "./MessageList";
import SBCopyToClipboard from "../common/SBCopyToClipboard";
import SBDeleteButton from "../common/SBDeleteButton";
import SBCopyToTabButton from "../common/SBCopyToTabButton";
import { getDateTime } from "../../services/utils";


const CommandGenerator = () => {
    // const [loadedSchema, setLoadedSchema] = useState('');
    // const [msgTypeOpts, setMsgTypeOpts] = useState([]);
    const [cmd, setCmd] = useState('');  
    const [isSending, setIsSending] = useState(false);  
    const [requestId, setRequestId] = useState("zzz");  
    const [messagesInView, setMessagesInView] = useState([]);

    const [sendCommand, { isLoading }] = useSendCommandMutation();
    const formId = "command_form";

    const sbEditorOnChange = (cmd: string) => {
        setCmd(cmd);
    }

    const handleDeleteFromChild = (id: string) => {
        if (id){
            setMessagesInView(
                messagesInView.filter((a: { id: string | undefined; }) => a.id !== id)
            );
        }       
    }    

    const onSendClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setMessagesInView([])

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
                                        height="50vh"
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
                        <MessageList requestId={requestId} messagesInView={messagesInView} setMessagesInView={setMessagesInView}></MessageList>
                    </div>                    
                </div>
                <div className='row pt-2'>
                    <div className='col-md-12'>
                        <div className="card">
                            <div className="card-header">
                                Message Viewer
                            </div>
                            <div className="card-body">
                                <div className='row'>
                                    {messagesInView.map(viewMessage => (
                                        <div className='col-md-6' key={viewMessage['id']}>
                                            <div className="card">
                                                <div className="card-header">
                                                    <span className={"badge rounded-pill " + (viewMessage['message']['msg_type'] === 'Response' ? 'text-bg-success' : 'text-bg-primary')}>{viewMessage['message']['msg_type']} </span>
                                                    <span title="Created by" className="badge text-bg-dark rounded-pill">{viewMessage['message']['created_by']} </span>
                                                    <span className="badge rounded-pill me-2" style={{ backgroundColor: viewMessage['message']['color_indicator'] }}>&nbsp;</span>                                                    
                                                    { viewMessage['message']['msg_type'] === "Response" ? (
                                                        <span title="Date Received" className="badge text-bg-dark rounded-pill">{getDateTime(viewMessage['message']['date_received'])}</span>
                                                    ) : (
                                                        <span title="Date Sent" className="badge text-bg-dark rounded-pill">{getDateTime(viewMessage['message']['date_sent'])}</span>
                                                    )}                                            

                                                    <SBDeleteButton buttonId={'delete'+viewMessage['id']} itemId={viewMessage['message']['id']} sendDeleteToParent={handleDeleteFromChild}customClass='float-end' />
                                                    <SBCopyToTabButton buttonId={''+viewMessage['id']} data={viewMessage['message']['msg']} tabName={'Expanded View'} customClass='float-end me-2' />
                                                    <SBCopyToClipboard buttonId={'copy'+viewMessage['id']} data={viewMessage['message']['msg']} shouldStringify={true} customClass='float-end me-2' />

                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <CodeMirror
                                                                value={ JSON.stringify(viewMessage['message']['msg'], null, 2) }
                                                                height="80vh"
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
                                    ))}                                                              
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