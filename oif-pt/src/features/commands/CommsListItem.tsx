import { useState } from "react";
import { Message } from "../../services/types";

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

    const getDateTime = (millis: string | undefined) => {
        let dateTime = ""
        if (millis && !undefined){ 
            const rawDate = new Date(parseInt(millis, 10))
            dateTime = rawDate.toLocaleDateString() + " " + rawDate.toLocaleTimeString()
        }
        return dateTime;
    }    
    
    return (
        <div>
            { message.msg_type === "Response" ? (
                <button type="button" onClick={(e) => onItemClick(e, message) } className={itemClass}>  
                    <div className="me-auto">
                        <span className="badge text-bg-success rounded-pill">{message.msg_type} </span>
                        <span title="Sent by" className="badge text-bg-dark rounded-pill">{message.created_by} </span>
                    </div>  
                    <span title="Date Received" className="badge text-bg-dark rounded-pill">{getDateTime(message.date_received)}</span>
                </button>
            ) : (
                <button type="button" onClick={(e) => onItemClick(e, message) }  className={itemClass}> 
                    <span className="badge text-bg-primary rounded-pill">{message.msg_type} </span>
                    <span title="Date Sent" className="badge text-bg-dark rounded-pill">{getDateTime(message.date_sent)}</span>
                </button>
            )}
        </div>
    );    

}
export default CommsListItem; 