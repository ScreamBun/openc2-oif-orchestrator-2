import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sbToastSuccess } from "./SBToast";

const SBDeleteButton = (props: any) => {

    const { buttonId, itemId, sendDeleteToParent, customClass} = props;

    const onDelete = () => {
        sbToastSuccess('Message remvoed');
        sendDeleteToParent(itemId);
    }
    
    return (
        <button id={'delete'+buttonId} type='button' title="Remove Message" className={'btn btn-sm btn-danger ' + customClass} onClick={onDelete}>
            <FontAwesomeIcon icon={faTrash} />
        </button>
    )
}
export default SBDeleteButton;