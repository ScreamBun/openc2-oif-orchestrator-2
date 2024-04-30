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
                    <p>
                        {labelValue.map(item => {
                            return (<li key={item}>{item}</li>);
                        })}
                    </p>   
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