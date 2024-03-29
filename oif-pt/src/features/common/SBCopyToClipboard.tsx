import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { sbToastError, sbToastSuccess } from "./SBToast";
import SBSpinner from "./SBSpinner";

const SBCopyToClipboard = (props: any) => {

    const { buttonId, data, customClass, shouldStringify = false } = props;
    const [isLoading, setIsLoading] = useState(false);

    const onCopyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        if (!data) {
            sbToastError('No data to copy');
            return;
        }

        let copied_data = data;
        setIsLoading(true);
        try {

            if (shouldStringify === true) {
                console.log("Stringify-ing")
                copied_data = JSON.stringify(data, null, 4);
                console.log(copied_data)
            }

            navigator.clipboard.writeText(copied_data);

            setIsLoading(false);
            sbToastSuccess(`Copied to clipboard`);
        } catch {
            setIsLoading(false);
            sbToastError('Failed to copy to clipboard')
        }
    }

    return (
        <>
            {isLoading ? <SBSpinner color={"primary"} /> :
                <button id={buttonId || 'copyToClipboard'} type='button' title="Copy to clipboard" className={'btn btn-sm btn-primary ' + customClass} onClick={onCopyClick}>
                    <FontAwesomeIcon icon={faCopy} />
                </button>
            }
        </>
    )
}
export default SBCopyToClipboard;