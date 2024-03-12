import React from "react";
import { faEdit, faPlus, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';

export const CreateBtn = (props: any) => {
    const { link } = props;
    const goto = useNavigate();

    return (
        <button type="button" className="btn btn-sm btn-primary float-end" title={`Create`}
            onClick={() => goto(link)}>
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        </button>
    );
}

export const EditBtn = (props: any) => {
    const { link } = props;
    const goto = useNavigate();

    return (
        <button type="button" className="btn btn-sm btn-primary me-1 float-end" title={`Edit`}
            onClick={() => goto(link)}>
            <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
        </button>
    );
}

export const DeleteBtn = (props: any) => {
    const { type, id, onDelete, disabled } = props;

    return (
        <span>
            <button type="button" className="btn btn-sm btn-danger float-end" data-bs-toggle="modal" data-bs-target="#deleteModal" title={`Delete`}>
                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </button>

            <div className="modal fade" id="deleteModal" tabIndex={-1} role="dialog" aria-labelledby="deleteModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title">Are you sure?</div>
                            <button type="button" className="btn btn-sm" data-bs-dismiss="modal" title="Close modal">
                                <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
                            </button>
                        </div>
                        <div className="modal-body text-align-center">
                            <p className="text-muted"> Do you want to delete {type} {id}? This process cannot be undone. </p>

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