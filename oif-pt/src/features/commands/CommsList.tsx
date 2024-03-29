import { useGetMessagesbyRequestIdQuery } from "../../services/apiSlice";
import { Message } from "../../services/types";
import CommsListItem from "./CommsListItem";

const CommsList = (props: any) => {

    const { requestId = "zzz", messagesInView, setMessagesInView } = props;
    const { data = [], error, isLoading, isFetching, refetch } = useGetMessagesbyRequestIdQuery(requestId, {
        pollingInterval: 2000
      })     

    const rowOfMessages = data.map((message: Message) => 
        <CommsListItem key={message.id} message={message} messagesInView={messagesInView} setMessagesInView={setMessagesInView}></CommsListItem>
    );    

    return (
        <div className="card h-50">
            <div className="card-header">
                <span>Comms List</span>
            </div>
            <div className="card-body p-0">
                <div className="list-group">
                    {rowOfMessages}
                </div>
            </div>
        </div>
    );
}
export default CommsList; 