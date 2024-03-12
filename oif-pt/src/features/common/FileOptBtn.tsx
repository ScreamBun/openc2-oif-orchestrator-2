import React from "react";
import { faFileDownload, faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sbToastError } from "./SBToast";


export const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = (ev: ProgressEvent<FileReader>) => {
            if (ev.target) {
                let data = ev.target.result;
                return data;
            }
        };
        fileReader.readAsText(file);
    }
}

const FileOptBtn = (props: any) => {
    const { data } = props;

    const onDownloadClick = (data: string) => {
        try {
            const filename = `schema.json`;

            const blob = new Blob([data], { type: "application/json" });
            const elem = document.createElement('a');
            elem.href = URL.createObjectURL(blob);
            elem.download = filename;
            document.body.appendChild(elem);
            elem.click();

            elem.remove();
            URL.revokeObjectURL(elem.href);
        } catch (err) {
            sbToastError(`File cannot be downloaded`);
        }
    }

    const onPopOutClick = (data: string) => {
        const blob = new Blob([data], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        window.open(url);
    }

    return (
        <div>
            <button type="button" id='download' title="Download" className='btn btn-sm btn-info float-end me-1' onClick={() => onDownloadClick(data)}>
                <FontAwesomeIcon icon={faFileDownload} />
            </button>
            <button type="button" id="popOut" title="View in new window" className="btn btn-sm btn-info me-1 float-end" onClick={() => onPopOutClick(data)}>
                <FontAwesomeIcon icon={faWindowMaximize} />
            </button>
        </div>
    );
}

export default FileOptBtn; 