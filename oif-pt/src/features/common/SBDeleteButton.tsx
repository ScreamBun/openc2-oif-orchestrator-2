import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sbToastSuccess } from "./SBToast";

const SBDeleteButton = (props: any) => {

    // TODO: Remove, replace with CRUDBtn for delete

    const { 
        buttonId, 
        buttonTitle = 'Remove Item', 
        customClass, 
        itemId, 
        deleteMsg = 'Item removed', 
        useConfirm = false,
        sendDeleteToParent
    } = props;

    const onDelete = () => {
        if (useConfirm) {
            // TODO: Add confirmation pop
        } else {
            sbToastSuccess(deleteMsg);
            sendDeleteToParent(itemId);
        }
    }
    
    return (
        <button id={'delete'+buttonId} type='button' title={buttonTitle} className={'btn btn-sm btn-danger ' + customClass} onClick={onDelete}>
            <FontAwesomeIcon icon={faTrash} />
        </button>
    )
}
export default SBDeleteButton;