import { useGetMessagesbyRequestIdQuery } from "../../services/apiSlice";
import { Message } from "../../services/types";

const CommsList = (props: any) => {

    const { requestId = "zzz", viewMessage, setViewMessage } = props;
    const { data = [], error, isLoading, isFetching, refetch } = useGetMessagesbyRequestIdQuery(requestId, {
        pollingInterval: 2000
      })    

    const getDateTime = (millis: string | undefined) => {
        let dateTime = ""
        if (millis && !undefined){ 
            const rawDate = new Date(parseInt(millis, 10))
            dateTime = rawDate.toLocaleDateString() + " " + rawDate.toLocaleTimeString()
        }
        return dateTime;
    }

    const rowOfMessages = data.map((message: Message) => 
        <div className="list-group" key={message.id}>
            { message.msg_type === "Response" ? (
                <button type="button" onClick={() => { setViewMessage(JSON.stringify(message, null, 2)) }} className="list-group-item list-group-item-action d-flex justify-content-between align-items-start">  
                    <div className="me-auto">
                        <span className="badge text-bg-success rounded-pill">{message.msg_type} </span>
                        <span title="Sent by" className="badge text-bg-dark rounded-pill">{message.created_by} </span>
                    </div>  
                    <span title="Date Received" className="badge text-bg-dark rounded-pill">{getDateTime(message.date_received)}</span>
                </button>
            ) : (
                <button type="button" onClick={() => { setViewMessage(JSON.stringify(message, null, 2)) }} className="list-group-item list-group-item-action d-flex justify-content-between align-items-start"> 
                    <span className="badge text-bg-primary rounded-pill">{message.msg_type} </span>
                    <span title="Date Sent" className="badge text-bg-dark rounded-pill">{getDateTime(message.date_sent)}</span>
                </button>
            )}
        </div>
    );    

    return (
        <div className="card">
            <div className="card-header">
                <span>Comms</span>
            </div>
            <div className="card-body p-0">
                {rowOfMessages}
            </div>
        </div>
    );
}
export default CommsList; 