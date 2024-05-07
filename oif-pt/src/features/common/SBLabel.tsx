export const SBLabel = (props: any) => {

    const { labelFor, labelText, isRequired = false, labelValue } = props;

    if(labelValue){

        if (labelValue instanceof Array) {
            return (
                <span>
                    { isRequired 
                        ? <label htmlFor={labelFor}>{labelText}<span className="text-danger ms-1">*</span></label>
                        : <label htmlFor={labelFor}>{labelText}</label>
                    }
                    <span>
                        {labelValue && labelValue.length > 0 ?
                            <ul className="list-group mt-2">
                                {labelValue.map(item => {
                                    return (
                                        <li className="list-group-item d-flex justify-content-between align-items-center" key={item}>{item}</li>
                                    );
                                })}
                            </ul>
                        :
                            <ul className="list-group mt-2">
                                <li className="list-group-item d-flex justify-content-between align-items-center">No items</li>
                            </ul>
                        }
                    </span>   
                </span>
            );
        } else {

            return (
                <span>
                    { isRequired 
                        ? <label htmlFor={labelFor}>{labelText}<span className="text-danger ms-1">*</span></label>
                        : <label htmlFor={labelFor}>{labelText}</label>
                    }
                    <p id={labelFor}>{labelValue}</p>
                </span>                
            );
        }

    } else {

        return (
            <span>
            { isRequired 
                ? <label htmlFor={labelFor}>{labelText}<span className="text-danger ms-1">*</span></label>
                : <label htmlFor={labelFor}>{labelText}</label>
            }       
            </span>
            
        );

    }

}