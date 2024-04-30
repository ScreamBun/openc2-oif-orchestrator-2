import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useNavigate } from "react-router-dom";

export const SBBackBtn = (props: any) => {
    const { link } = props;
    // const goto = useNavigate();

    return (
        <a className='' href={link} title='Go back' rel="noreferrer">
            <FontAwesomeIcon icon={faArrowCircleLeft} className="me-2"></FontAwesomeIcon>
        </a> 
    );
}