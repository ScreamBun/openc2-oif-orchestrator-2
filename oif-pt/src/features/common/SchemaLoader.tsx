import React, { useState } from "react";
import SBEditor from "./SBEditor";


const SchemaLoader = (props: any) => {
    const { loadedSchema, setLoadedSchema, setMsgTypeOpts } = props;
    const [selectedSchema, setSelectedSchema] = useState('');

    //TODO: get list of available schemas from database to populate dropdown
    const schemaOpts = ['schema1', 'schema2'];
    //schema.type = profile versus actuator
    //TODO: if actuator is selected in schema, add protocol and serialization dropdowns

    const onSchemaSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSchema(e.target.value);
        if (e.target.value === "") {
            setLoadedSchema('');
        } else {
            //TODO: load and read schema file
            //setLoadedSchema();

            //TODO: set msgOpts
            setMsgTypeOpts(["type1", 'type2']);
        }
    };

    return (
        <div className="card">
            <div className="card-header p-2">
                <div className="row no-gutters">
                    <div className="col-md-6">
                        <select id="schema-list" name="schema-list" className="form-control form-control-sm" value={selectedSchema} onChange={onSchemaSelect}>
                            <option value="">Select a Schema...</option>
                            {schemaOpts.map((s: any) => <option key={s} value={s} >{s}</option>)}
                        </select>
                    </div>
                </div>
            </div>
            <div className="card-body p-0">
                <SBEditor data={loadedSchema} isReadOnly={true}></SBEditor>
            </div>
        </div>
    )
}
export default SchemaLoader;
