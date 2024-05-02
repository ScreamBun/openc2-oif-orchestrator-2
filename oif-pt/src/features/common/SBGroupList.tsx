import { faMinusCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { sbToastError } from "./SBToast";
import React, { KeyboardEvent } from 'react';


interface SBGroupListProps {
    id: string;
    data: string[] | undefined;
    useInput: boolean;
    fieldName: string;
    onDataChange: (fieldName: string, fieldValue: string[]) => void;
}

const SBGroupList = (props: SBGroupListProps) => {

    const { id, data = [], useInput, fieldName, onDataChange } = props;
    const [inputValue, setInputValue] = useState(''); 
    const [isAddDisabled, setIsAddDisabled] = useState(true); 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setInputValue(e.target.value);
        if (e.target.value) {
            setIsAddDisabled(false);
        } else {
            setIsAddDisabled(true);
        }
    }

    const onAddClickEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onAddClick();
    }

    const onAddClick = () => { 
        
        if(!inputValue){
            sbToastError("No item entered")
            return
        }

        const itemsFound = data.filter(listItem => listItem.toLowerCase() === inputValue.toLowerCase());
        if (itemsFound.length > 0){
            sbToastError("Item already exists");
            return
        }

        let newStateArray = data.slice();
        newStateArray.unshift(inputValue);
        onDataChange(fieldName, newStateArray);

        setInputValue('');
    }; 

    const onRemoveClick = (removeItem: string, e: React.MouseEvent<HTMLButtonElement>) => { 
        e.preventDefault();
        const filtered = data.filter(listItem => listItem !== removeItem);
        onDataChange(fieldName, filtered);
    };
    
    const handleKeyboardEvent = (evt: KeyboardEvent<HTMLInputElement>) => {
        if (evt.key === 'Enter') {
            evt.preventDefault();
            onAddClick();
        }
    };

    const listOfItems = data.map((item: string) =>
        <li className="list-group-item d-flex justify-content-between align-items-center">
            {item}
            <button role="link" className='btn btn-sm' title="Remove item" onClick={(e) => { onRemoveClick(item, e); }}>
                <FontAwesomeIcon icon={faMinusCircle}></FontAwesomeIcon>            
            </button>
        </li>
    );

    return (

        <div>
            { useInput ? 
                <div className="input-group input-group-sm mb-2">
                    <input id={id + "_input"} name={id + "_input"} type='text' className="form-control" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyboardEvent}  />
                    <button id="add_item" type="button" className="btn btn-sm btn-primary" disabled={isAddDisabled} onClick={onAddClickEvent}>
                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                    </button>
                </div>
                :
                <span></span>
            }

            <ul className="list-group">
                {listOfItems && listOfItems.length > 0 ? listOfItems : <li className="list-group-item d-flex justify-content-between align-items-center">No items added</li>}
            </ul>
        </div>
    );
}

export default SBGroupList;