import React, { useState } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { githubDark } from '@uiw/codemirror-themes-all';
import { useSendCommandMutation } from "../../services/apiSlice";
import { sbToastError, sbToastSuccess } from "../common/SBToast";
import { Command, MessageWrapper } from "../../services/types";
import SBSubmitBtn from "../common/SBSubmitBtn";
import MessageList from "./MessageList";
import MessageViewer from "./MessageViewer";


const CommandGenerator = () => {
    // const [loadedSchema, setLoadedSchema] = useState('');
    // const [msgTypeOpts, setMsgTypeOpts] = useState([]);
    const [cmd, setCmd] = useState('');  
    const [isSending, setIsSending] = useState(false);  
    const [requestId, setRequestId] = useState("zzz");  
    const [messagesInView, setMessagesInView] = useState<MessageWrapper[]>([]);

    const [sendCommand, { isLoading }] = useSendCommandMutation();
    const formId = "command_form";

    const sbEditorOnChange = (cmd: string) => {
        setCmd(cmd);
    }

    const toggleMsgView = (isChecked: boolean, messageWrapper: MessageWrapper) => {
        console.log("ischecked: " + isChecked + " msg_id: " + messageWrapper.id)

        if (isChecked === true){
            setMessagesInView( 
                [
                    ...messagesInView, // that contains all the old items
                    { id: messageWrapper.id, message: messageWrapper.message } // and one new item at the end
                ]
            );            
        } else {
            setMessagesInView(
                messagesInView.filter((a: { id: string }) => a.id !== messageWrapper.id)
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
                        <MessageViewer messagesInView={messagesInView} setMessagesInView={setMessagesInView} toggleMsgView={toggleMsgView}></MessageViewer>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CommandGenerator; 