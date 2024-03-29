import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SBCopyToTabButton = (props: any) => {

    const { buttonId, tabName = "expanded view", data, dataType = "json", customClass} = props;

    const onNewTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const myjson = JSON.stringify(data, null, 2);
        console.log(myjson);
        const x = window.open();
        if (x){
            x.document.open();
            x.document.write('<html><body><pre>' + myjson + '</pre></body></html>');
            x.document.title = tabName
            x.document.close();        
        }
    }

    return (
        <button id={'newTab'+buttonId} type='button' title="Open in new tab" className={'btn btn-sm btn-primary ' + customClass} onClick={onNewTabClick}>
            <FontAwesomeIcon icon={faSquareArrowUpRight} />
        </button>
    )    
}
export default SBCopyToTabButton;