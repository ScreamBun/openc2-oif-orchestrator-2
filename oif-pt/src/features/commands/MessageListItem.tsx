import { useState } from "react";
import { getDateTime } from "../../services/utils";

const MessageListItem = (props: any) => {

    const { message, messagesInView, setMessagesInView } = props;
    const [checked, setChecked] = useState(false);

    const buttonClasses = "list-group-item list-group-item-action"

    const toggle = () => {
        return true;
    }

    const toggleMsgView = () => {

        console.log('toggle / checked: ' + checked);

        if (!checked){
            console.log('onItemClick / setMessagesInView: ' + JSON.stringify(messagesInView, null, 2));
            setMessagesInView( 
                [
                    ...messagesInView, // that contains all the old items
                    { id: message.id, message: message } // and one new item at the end
                ]
            );            
        } else {
            setMessagesInView(
                messagesInView.filter((a: { id: string | undefined; }) => a.id !== message.id)
            );  
            console.log('onItemClick / messagesInView.filter: ' + JSON.stringify(messagesInView, null, 2));          
        }        

        return checked;
      }  
    
    return (
        <div>
            <button type="button" className={buttonClasses} onClick={() => {setChecked(!checked); toggleMsgView();}} >  
                <input id={"check" + message.id} className="form-check-input me-2" type="checkbox" checked={checked} onChange={e => toggle} />               
                <span className={"badge rounded-pill " + (message.msg_type === 'Response' ? 'text-bg-success' : 'text-bg-primary')}>{message.msg_type} </span>
                <span title="Created by" className="badge text-bg-dark rounded-pill">{message.created_by} </span>
                <span className="badge rounded-pill" style={{ backgroundColor: message.color_indicator }}>&nbsp;</span>
                { message.msg_type === "Response" ? (
                     <span title="Date Received" className="badge text-bg-dark rounded-pill float-end">{getDateTime(message.date_received)}</span>
                ) : (
                    <span title="Date Sent" className="badge text-bg-dark rounded-pill float-end">{getDateTime(message.date_sent)}</span>
                )}                
            </button>
        </div>
    );    

}
export default MessageListItem; 