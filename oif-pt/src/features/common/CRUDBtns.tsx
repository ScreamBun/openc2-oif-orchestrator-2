import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';

export const SBCreateBtn = (props: any) => {
    const { link } = props;
    const goto = useNavigate();

    return (
        <button type="button" className="btn btn-sm btn-primary float-end" title={`Create`} onClick={() => goto(link)}>
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        </button>
    );
}

export const SBEditBtn = (props: any) => {
    const { link, customClass } = props;
    const goto = useNavigate();

    return (
        <button type="button" className={"btn btn-sm btn-primary " + customClass} title={`Edit`}
            onClick={() => goto(link)}>
            <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
        </button>
    );
}

export const SBDeleteBtn = (props: any) => {
    const { id, type, disabled, customClass, onDelete } = props;

    return (
        <span>
            <button id={'deleteBtn' + id} type="button" className={"btn btn-sm btn-danger " + customClass} data-bs-toggle="modal" data-bs-target={"#deleteModal" + id} title={`Delete`}>
                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </button>
            <div id={'deleteModal' + id} className="modal fade" tabIndex={-1} role="dialog" aria-labelledby="deleteModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title">Confirm</div>
                        </div>
                        <div className="modal-body text-align-center">
                            <p>Do you want to delete {type}?</p>
                            <p>This process cannot be undone.</p>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-md btn-secondary" data-bs-dismiss="modal">
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-md btn-danger" data-bs-dismiss="modal" onClick={onDelete} disabled={disabled}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </span>
    );
}