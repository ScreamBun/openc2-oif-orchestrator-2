import SBDeleteButton from "../common/SBDeleteButton";
import SBCopyToTabButton from "../common/SBCopyToTabButton";
import SBCopyToClipboard from "../common/SBCopyToClipboard";
import SBDownloadBtn from "../common/SBDownloadBtn";
import { getDateTime } from "../../services/utils";
import CodeMirror from '@uiw/react-codemirror';
import { langs } from "@uiw/codemirror-extensions-langs";
import { githubDark } from "@uiw/codemirror-themes-all";
import { MessageWrapper } from "../../services/types";

const MessageViewer = (props: any) => {
    const { messagesInView, setMessagesInView, toggleMsgView } = props;
    
    const handleDeleteFromChild = (messageWrapper: MessageWrapper) => {
        // if (id){

            toggleMsgView(false, messageWrapper);

            // setMessagesInView(
            //     messagesInView.filter((a: { id: string | undefined; }) => a.id !== id)
            // );
        // }
    }   

    return (
            <div className="card">
                <div className="card-header">
                    Message Viewer
                </div>
                <div className="card-body">
                    <div className='row'>
                        {messagesInView.map((viewMessage: MessageWrapper ) => (
                            <div className='col-md-6' key={viewMessage.message.id}>
                                <div className="card">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <span className={"badge rounded-pill " + (viewMessage.message.msg_type === 'Response' ? 'text-bg-success' : 'text-bg-primary')}>{viewMessage.message.msg_type} </span>
                                                <span title="Created by" className="badge text-bg-dark rounded-pill">{viewMessage.message.created_by} </span>
                                                <span className="badge rounded-pill me-2" style={{ backgroundColor: viewMessage.message.color_indicator }}>&nbsp;</span>
                                                <div className="btn-group btn-group-sm float-end" role="group" aria-label="Basic example">
                                                    <SBCopyToClipboard buttonId={'copy'+viewMessage.message.id} data={viewMessage.message.msg} shouldStringify={true} />
                                                    <SBDownloadBtn buttonId={'download'+viewMessage.message.id} filename={viewMessage.message.created_by + "_" + viewMessage.message.msg_type + "_" + viewMessage.message.request_id} data={viewMessage.message.msg} />
                                                    <SBCopyToTabButton buttonId={''+viewMessage.message.id} data={viewMessage.message.msg} tabName={'Expanded View'} />
                                                    <SBDeleteButton buttonId={'delete'+viewMessage.message.id} itemId={viewMessage.message.id} sendDeleteToParent={handleDeleteFromChild(viewMessage)} />
                                                </div>
                                            </div>
                                        </div>                                                      
                                        <div className="row">
                                            <div className="col-md-12">
                                                { viewMessage.message.msg_type === "Response" ? (
                                                    <span title="Date Received" className="badge text-bg-dark rounded-pill">{getDateTime(viewMessage.message.date_received)}</span>
                                                ) : (
                                                    <span title="Date Sent" className="badge text-bg-dark rounded-pill">{getDateTime(viewMessage.message.date_sent)}</span>
                                                )}    
                                            </div>
                                        </div>                                                  
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <CodeMirror
                                                    value={ JSON.stringify(viewMessage.message.msg, null, 2) }
                                                    height="80vh"
                                                    maxHeight='100%'
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
    )

}
export default MessageViewer; 