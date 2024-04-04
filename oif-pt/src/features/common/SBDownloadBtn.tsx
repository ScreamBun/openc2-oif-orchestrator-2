import React, { useState } from "react";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sbToastError, sbToastSuccess, sbToastWarning } from "./SBToast";
import SBSpinner from "./SBSpinner";
import { format } from "../../services/utils";
import { FILENAME_RULE, LANG_JSON } from "./Constants";


const SBDownloadBtn = (props: any) => {

    const { buttonId, data, customClass, filename, ext = LANG_JSON } = props;

    const [fileNameInput, setFileNameInput] = useState(filename);
    const [toggleDownloadDialog, setToggleDownloadDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const icon = <FontAwesomeIcon icon={faFileDownload} />;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileNameInput(e.target.value);
    }

    const onDownloadIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setToggleDownloadDialog(true);
    }

    const onDownloadFileClick = (e: React.MouseEvent<HTMLButtonElement>, fmt: string) => {
        e.preventDefault();
        if (!data) {
            sbToastError('No data to download');
            return;
        }

        setIsLoading(true);
        try {
            const filename = `${fileNameInput}.${fmt}`;
            let formattedData = typeof data == "object" ? format(data, fmt, 4) : data;

            const blob = new Blob([formattedData], { type: "application/json" });
            const elem = document.createElement('a');
            elem.href = URL.createObjectURL(blob);
            elem.download = filename;
            document.body.appendChild(elem);
            elem.click();

            // To make this work on Firefox we need to wait
            // a little while before removing it.
            setTimeout(() => {
                elem.remove();
                URL.revokeObjectURL(elem.href);
            }, 0);
            sbToastSuccess('File downloaded')

        } catch (err) {
            console.log(err);
            sbToastError(`File cannot be downloaded`);
        }
    }

    const onDownloadClick = (e: React.MouseEvent<HTMLButtonElement>, fmt: string) => {
        e.preventDefault();
        if (fileNameInput === '' || fileNameInput === undefined) {
            sbToastWarning('Please enter a file name.');
            return;
        } else if (!FILENAME_RULE.test(fileNameInput)) {
            sbToastWarning("Please do not use special characters in file name.");
            return;
        }

        onDownloadFileClick(e, ext);
        setIsLoading(false);
        setToggleDownloadDialog(false);
    }

    return (
        <>
            {isLoading ? <SBSpinner color={"primary"} /> :
                <button id={buttonId || 'downloadBtn'} type='button' title={`Download ${ext} File`} className={'btn btn-sm btn-primary ' + customClass} onClick={onDownloadIconClick}>
                    {icon}
                </button>}

            <div id="downloadFileModal" className={`modal fade ${toggleDownloadDialog ? 'show d-block' : 'd-none'}`} tabIndex={-1} role='dialog'>
                <div className={`modal-dialog modal-dialog-centered`} role='document'>
                    <div className='modal-content'>
                        <div className="modal-header">
                            <div className="form col">
                                <div className="form row">
                                    <h5 className='modal-title'>
                                        Download As...
                                    </h5>
                                </div>
                                <div className="form row">
                                    <small className="text-muted"> {`Download file to local computer`}</small>
                                </div>
                            </div>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' title='Close' onClick={() => setToggleDownloadDialog(false)} />
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <label htmlFor="filenameDownload" className="col-sm-4 col-label">File name:</label>
                                <div className="col-sm-8">
                                    <input id='filenameDownload' className="form-control" type="text" autoFocus={true} value={fileNameInput} onChange={onChange} />
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="downloadFileAsType" className="col-sm-4 col-label">Save as type:</label>
                                <div className="col-sm-8">
                                    <input type="text" readOnly className="form-control-plaintext" id="downloadFileAsType" value={ext} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type='button' className='btn btn-sm btn-success' onClick={(e) => onDownloadClick(e, ext)}>Download</button>
                            <button type='button' className='btn btn-sm btn-secondary' onClick={() => { setIsLoading(false); setToggleDownloadDialog(false); }}>Cancel</button>
                        </div>
                    </div>
                </div>
                <div className={`modal-backdrop fade ${toggleDownloadDialog ? 'show' : ''}`} style={{
                    zIndex: -1
                }}>
                </div>
            </div>
        </>
    )
}
export default SBDownloadBtn;