import React, { useState } from "react";

const MultiSelect = (props: any) => {
    const { fieldOpts, name, value, onchange } = props;
    const [listData, setListData] = useState(value)

    const onFileCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            const updatedList = [...listData, e.target.name];
            setListData(updatedList);
            onchange(name, updatedList);
        } else {
            //remove from list
            var filtered;
            if (listData.length !== 1) {
                filtered = listData.filter((item: string) => item !== e.target.name);
            } else {
                if (listData === e.target.name) {
                    filtered = [];
                }
            }
            setListData(filtered);
            onchange(name, filtered);
        }
    }

    return (
        <div>
            {fieldOpts.map((s: any) => (
                <div className="form-check form-check-inline" key={s}>
                    <input type="checkbox" className="form-check-input" id={s} value={s} name={s} onChange={onFileCheck} checked={listData.includes(s) ? true : false} />
                    <label className="form-check-label" htmlFor={s}>
                        {s}
                    </label>
                </div>
            ))}
        </div>
    );
}

export default MultiSelect;