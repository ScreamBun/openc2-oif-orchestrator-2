import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";


const SBGroupList = (props: any) => {

    const { id, data, useInput } = props;

    const [inputValue, setInputValue] = useState(''); 
    const [isAddDisabled, setIsAddDisabled] = useState(true); 
    const [dataList, setDataList] = useState<string[]>([]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (e.target.value) {
            setIsAddDisabled(false);
        } else {
            setIsAddDisabled(true);
        }
    }

    const onAddClick = () => { 
        // Add to list
        var newStateArray = dataList.slice();
        newStateArray.push(inputValue);
        setDataList(newStateArray);

        setInputValue('');
    };  

    if (!dataList) {
        return (
            <div>
                { useInput ? 
                    <div className="input-group input-group-sm mb-2">
                        <input id={id + "_input"} name={id + "_input"} type='text' className="form-control" value={inputValue} onChange={handleInputChange} />
                        <button id="button-addon2" type="button" className="btn btn-sm btn-primary" disabled={isAddDisabled} onClick={onAddClick}>
                            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        </button>
                    </div>
                    :
                    <span></span>
                }
                <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        No items added
                    </li>
                </ul>
            </div>
        );
    }

    const listOfItems = dataList.map((item: string) =>
        <li className="list-group-item d-flex justify-content-between align-items-center">
            {item}
            <span className="badge bg-primary rounded-pill">14</span>
        </li>
    );

    return (

        <div>
            { useInput ? 
                <div className="input-group input-group-sm mb-2">
                    <input id={id + "_input"} name={id + "_input"} type='text' className="form-control" value={inputValue} onChange={handleInputChange} />
                    <button id="button-addon2" type="button" className="btn btn-sm btn-primary" disabled={isAddDisabled} onClick={onAddClick}>
                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                    </button>
                </div>
                :
                <span></span>
            }

            <ul className="list-group">
                {listOfItems}
            </ul>
        </div>
    );
}

export default SBGroupList;