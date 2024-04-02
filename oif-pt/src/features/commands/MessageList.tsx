import { useGetMessagesbyRequestIdQuery } from "../../services/apiSlice";
import { Message } from "../../services/types";
import MessageListItem from "./MessageListItem";

const MessageList = (props: any) => {

    const { requestId = "zzz", messagesInView, setMessagesInView } = props;
    const { data = [], error, isLoading, isFetching, refetch } = useGetMessagesbyRequestIdQuery(requestId, {
        pollingInterval: 2000
      })     

    const rowOfMessages = data.map((message: Message) => 
        <MessageListItem key={message.id} message={message} messagesInView={messagesInView} setMessagesInView={setMessagesInView}></MessageListItem>
    );    

    return (
        <div className="card h-100 overflow-auto">
            <div className="card-header">
                <span>Message List</span>
            </div>
            <div className="card-body p-0">
                <div className="list-group">
                    {rowOfMessages}
                </div>
            </div>
        </div>
    );
}
export default MessageList; 