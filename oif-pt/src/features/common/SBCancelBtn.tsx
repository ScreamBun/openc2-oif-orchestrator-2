import { faCancel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export const SBCancelBtn = (props: any) => {
    const { customClass } = props;
    const goto = useNavigate();

    const onCancel = () => {
        goto(-1);
    }    

    return (
        <button type="button" className={"btn btn-sm btn-secondary " + customClass} title="Cancel" onClick={onCancel}>
            <FontAwesomeIcon icon={faCancel}></FontAwesomeIcon>
        </button>
    );
}