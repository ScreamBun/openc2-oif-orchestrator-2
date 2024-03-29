import { useState } from "react";
import { Message } from "../../services/types";
import { getDateTime } from "../../services/utils";

const CommsListItem = (props: any) => {

    const activeClasses = "list-group-item list-group-item-action d-flex justify-content-between align-items-start active"
    const inActiveClasses = "list-group-item list-group-item-action d-flex justify-content-between align-items-start"

    const { message, messagesInView, setMessagesInView } = props;

    const [clicked, setClicked] = useState(false); 
    const [itemClass, setItemClass] = useState(inActiveClasses); 

    const onItemClick = (e: React.MouseEvent<HTMLButtonElement>, message: Message) => {
        e.preventDefault();

        setClicked(!clicked);
        if (clicked){
            setItemClass(activeClasses)
            setMessagesInView( 
                [
                    ...messagesInView, // that contains all the old items
                    { id: message.id, message: message } // and one new item at the end
                ]
            );            
        } else {
            setItemClass(inActiveClasses)
            setMessagesInView(
                messagesInView.filter((a: { id: string | undefined; }) => a.id !== message.id)
            );            
        }
    }   
    
    return (
        <div>
            {/* Leftoff here with badge colors */}
            { message.msg_type === "Response" ? (
                <button type="button" onClick={(e) => onItemClick(e, message) } className={itemClass}>  
                    <input className="form-check-input me-2" type="checkbox" value="" checked id={"check" + message.id} />               
                    <span className="badge text-bg-success rounded-pill">{message.msg_type} </span>
                    <span title="Created by" className="badge text-bg-dark rounded-pill">{message.created_by} </span>
                    <span title="Date Received" className="badge text-bg-dark rounded-pill">{getDateTime(message.date_received)}</span>
                </button>
            ) : (
                <button type="button" onClick={(e) => onItemClick(e, message) }  className={itemClass}> 
                    <input className="form-check-input me-2" type="checkbox" value="" checked id={"check" + message.id} />
                    <span className="badge text-bg-primary rounded-pill">{message.msg_type} </span>
                    <span title="Created by" className="badge text-bg-dark rounded-pill">{message.created_by} </span>
                    <span title="Date Sent" className="badge text-bg-dark rounded-pill">{getDateTime(message.date_sent)}</span>
                </button>
            )}
        </div>
    );    

}
export default CommsListItem; 