import { NAV_EXTERNAL_CBOR, NAV_EXTERNAL_HTTPS, NAV_EXTERNAL_JSON, NAV_EXTERNAL_MQTT, NAV_EXTERNAL_XML } from './consts';

const Home = () => {

    return (
        <div className='container'>
            <div className='row mb-3'>
                <div className='col'>
                    <div className='card'>
                        <div className='card-header'>Statement of Purpose</div>
                        <div className='card-body'>
                            <p>
                                OpenC2 Integration Framework (OIF) is a project that will enable developers to create and test OpenC2
                                specifications and implementations without having to recreate an entire OpenC2 ecosystem.
                            </p>
                            <p>
                                The OpenC2 Producer is a proof-of-concept tool that implements the "Producer" function described in OpenC2 Specifications. 
                                This tool supplies a reference implementation that can be extended as needed to aid in the use of OpenC2 as a standardized 
                                means of communication between various devices. 
                                The tool is intended to be simple to start and use for OpenC2 development and testing.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <div className='card'>
                        <div className='card-header'>Transports</div>
                        <div className='card-body p-0'>
                            <ul className="list-group">
                                {/* <li className="list-group-item disabled"> CoAP - Nonstandard, no specification</li> */}
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_MQTT} rel="noopener noreferrer" target="_blank">MQTT</a>
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_HTTPS} rel="noopener noreferrer" target="_blank">HTTP <sup className='text-muted'>Coming Soon</sup></a>
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_HTTPS} rel="noopener noreferrer" target="_blank">HTTPS <sup className='text-muted'>Coming Soon</sup></a>
                                {/* <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_OPENDXL} rel="noopener noreferrer" target="_blank">OpenDXL - In Progress</a> */}
                                {/* <li className="list-group-item disabled"> ZMQ - Nonstandard, no specification</li> */}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='card'>
                        <div className='card-header'>Serializations</div>
                        <div className='card-body p-0'>
                            <ul className="list-group">
                                {/* <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_BINN} rel="noopener noreferrer" target="_blank">Binn</a>
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_BENCODE} rel="noopener noreferrer" target="_blank">Bencode</a>
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_BSON} rel="noopener noreferrer" target="_blank">BSON</a> */}
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_JSON} rel="noopener noreferrer" target="_blank">JSON </a>
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_CBOR} rel="noopener noreferrer" target="_blank">CBOR <sup className='text-muted'>Coming Soon</sup></a>
                                {/* <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_ION} rel="noopener noreferrer" target="_blank">Amazon ION</a> */}
                                {/* <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_MSGPACK} rel="noopener noreferrer" target="_blank">MessagePack (msgpack)</a> */}
                                {/* <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_SEXP} rel="noopener noreferrer" target="_blank">S-expressions</a>
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_SMILE} rel="noopener noreferrer" target="_blank">Smile</a>
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_TOML} rel="noopener noreferrer" target="_blank">Toml</a> */}
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_XML} rel="noopener noreferrer" target="_blank">XML <sup className='text-muted'>Coming Soon</sup></a>
                                {/* <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_UBJSON} rel="noopener noreferrer" target="_blank">UBJSON</a> */}
                                {/* <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_VPACK} rel="noopener noreferrer" target="_blank">
                                    VelocityPack (VPack)
                                    <p className="mb-1 small text-muted">- Requires velocity pack to be installed, only C++ module available</p>
                                </a>
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_YAML} rel="noopener noreferrer" target="_blank">YAML</a> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;