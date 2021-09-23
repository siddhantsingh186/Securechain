import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Enroll.scss';

const Enroll = () => {
    const [owner, setOwner] = useState("");
    const [role, setRole] = useState("");
    const [company, setCompany] = useState("");
    const [ethereumAddress, setEthereumAddress] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(owner && role && company && ethereumAddress){
            
        }
    }
    return (
        <>
            <article>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <div className="field">
                            <label htmlFor="owner" className="lab">
                                <h3>Select the owner of supply chain:</h3>
                            </label>
                            <br/>
                            <input
                                type="text"
                                id="owner"
                                name="owner"
                                placeholder="Enter Owner"
                                value={owner}
                                onChange={(e) => setOwner(e.target.value)}
                            />        
                        </div>
                    </div>
                </form>

                <div className="head">
                    <h2>Enroll in Supply Chain</h2>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <div className="field">
                            <label htmlFor="owner" className="lab">
                                Owner:
                            </label>
                            <input
                                type="text"
                                id="owner"
                                name="owner"
                                value={owner}
                                onChange={(e) => setOwner(e.target.value)}
                            />        
                        </div>
                        
                        <div className="field">
                            <label htmlFor="role" className="lab">
                                Role:
                            </label>
                            <select
                                value={role}
                                placeholder="Choose your role"
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="manufacturer">
                                    Manufacturer
                                </option>
                                <option value="transporter">
                                    Transporter
                                </option>
                                <option value="Distributor">
                                    Distributor
                                </option>
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="company" className="lab">
                                Company Name:
                            </label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                placeholder="Enter company name"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="ethereumAddress" className="lab">
                                Ethereum Address:
                            </label>
                            <input
                                type="text"
                                id="ethereumAddress"
                                name="ethereumAddress"
                                placeholder="Enter Ethereum Address"
                                value={ethereumAddress}
                                onChange={(e) => setEthereumAddress(e.target.value)}
                            />
                        </div>
                    </div>
                    <br/>
                    <div>
                        <button type="submit" className='btn'><Link to='/selectSupplyChain/enroll/dashboard'>Request Participation</Link></button>
                    </div>
                </form>
            </article>
        </>
    )

}
export default Enroll;
