import React, { useState } from "react";
import SchemaLoader from "../common/SchemaLoader";
import CommandCreator from "./CommandCreator";

const CommandGenerator = () => {
    const [loadedSchema, setLoadedSchema] = useState('');
    const [msgTypeOpts, setMsgTypeOpts] = useState([]);

    return (
        <div className="card">
            <div className="card-header">
                Command Generator
            </div>
            <div className="card-body">
                <div className='row'>
                    <div className='col-md-6 pr-1'>
                        <SchemaLoader
                            loadedSchema={loadedSchema} setLoadedSchema={setLoadedSchema}
                            msgTypeOpts={msgTypeOpts} setMsgTypeOpts={setMsgTypeOpts} />
                    </div>
                    <div className='col-md-6 pl-1'>
                        <CommandCreator
                            loadedSchema={loadedSchema} msgTypeOpts={msgTypeOpts} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CommandGenerator; 