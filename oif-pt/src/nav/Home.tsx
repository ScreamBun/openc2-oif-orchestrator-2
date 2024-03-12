import { toast } from 'react-toastify';
import OpenC2Logo from '../static/assets/img/openc2-logo.svg'
import { NAV_EXTERNAL_BENCODE, NAV_EXTERNAL_BINN, NAV_EXTERNAL_BSON, NAV_EXTERNAL_CBOR, NAV_EXTERNAL_HTTPS, NAV_EXTERNAL_ION, NAV_EXTERNAL_JSON, NAV_EXTERNAL_MQTT, NAV_EXTERNAL_MSGPACK, NAV_EXTERNAL_OIF_DEVICE, NAV_EXTERNAL_OPENDXL, NAV_EXTERNAL_SEXP, NAV_EXTERNAL_SMILE, NAV_EXTERNAL_TOML, NAV_EXTERNAL_UBJSON, NAV_EXTERNAL_VPACK, NAV_EXTERNAL_XML, NAV_EXTERNAL_YAML } from './consts';

const Home = () => {

    const displayLoginNotification = () => {
        toast.success("Yay toasts are working");
      };

    return (
        <div className='container'>
            <div className='row mb-3'>
                <div className='col'>
                    <div className='mb-3'>
                        <img src={OpenC2Logo} alt="OpenC2 Logo" className="img-responsive w-100" />
                    </div>
                    <div className='card'>
                        <div className='card-header'>Statement of Purpose</div>
                        <div className='card-body'>
                            <button onClick={displayLoginNotification}>Remove me</button>
                            <p>
                                OpenC2 Integration Framework (OIF) is a project that will enable developers to create and test OpenC2
                                specifications and implementations without having to recreate an entire OpenC2 ecosystem.
                            </p>
                            <p>
                                OIF consists of two major parts. The &quot;orchestrator&quot; which functions as an OpenC2 producer and
                                the &quot;Device&quot; which functions as an OpenC2 consumer.
                            </p>
                            <p>
                                This application is the OpenC2 Orchestrator. The Device repository can be found&nbsp;
                                <a href={NAV_EXTERNAL_OIF_DEVICE} rel="noopener noreferrer" target="_blank">here</a>
                                .&nbsp;Due to port bindings it is recommended that the orchestrator and the device not be run on the same
                                machine.
                            </p>
                            <p>
                                The OIF Orchestrator was created with the intent of being an easy-to-configure OpenC2 producer that can be
                                used in the creation of reference implementations to control multiple devices. To that end it allows for the
                                addition of multiple serializations and transportation types.
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
                                <li className="list-group-item disabled"> CoAP - Nonstandard, no specification</li>
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_HTTPS} rel="noopener noreferrer" target="_blank">HTTPS<sup className='text-muted'>* Official</sup></a>
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_MQTT} rel="noopener noreferrer" target="_blank">MQTT - In Progress</a>
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_OPENDXL} rel="noopener noreferrer" target="_blank">OpenDXL - In Progress</a>
                                <li className="list-group-item disabled"> ZMQ - Nonstandard, no specification</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='card'>
                        <div className='card-header'>Serializations</div>
                        <div className='card-body p-0'>
                            <ul className="list-group">
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_BINN} rel="noopener noreferrer" target="_blank">Binn</a>
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_BENCODE} rel="noopener noreferrer" target="_blank">Bencode</a>
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_BSON} rel="noopener noreferrer" target="_blank">BSON</a>
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_CBOR} rel="noopener noreferrer" target="_blank">CBOR</a>
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_ION} rel="noopener noreferrer" target="_blank">Amazon ION</a>
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_JSON} rel="noopener noreferrer" target="_blank">JSON<sup className='text-muted'>* Official</sup> </a>
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_MSGPACK} rel="noopener noreferrer" target="_blank">MessagePack (msgpack)</a>
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_SEXP} rel="noopener noreferrer" target="_blank">S-expressions</a>
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_SMILE} rel="noopener noreferrer" target="_blank">Smile</a>
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_TOML} rel="noopener noreferrer" target="_blank">Toml</a>
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_XML} rel="noopener noreferrer" target="_blank">XML</a>
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_UBJSON} rel="noopener noreferrer" target="_blank">UBJSON</a>
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_VPACK} rel="noopener noreferrer" target="_blank">
                                    VelocityPack (VPack)
                                    <p className="mb-1 small text-muted">- Requires velocity pack to be installed, only C++ module available</p>
                                </a>
                                <a className="list-group-item list-group-item-action" href={NAV_EXTERNAL_YAML} rel="noopener noreferrer" target="_blank">YAML</a>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;