import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Selectsupplychain.scss';
export default function Selectsupplychain () {
    const [supplyChain, setSupplyChain] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if(supplyChain){

        }
    }
    return (
        <>
            <article>
                <form className='form' onSubmit={handleSubmit}>
                    <div className='form-control'>
                        <label htmlFor='supplyChain'>
                            Choose from the following existing supply chains :
                        </label>
                        <br/><br/>
                        <select
                            value={supplyChain}
                            onChange={(e) => setSupplyChain(e.target.value)}
                        >
                            <option value="vaccine">
                                vaccine supply chain
                            </option>
                            <option value="milk">
                                milk supply chain
                            </option>
                            <option value="ice-cream">
                                ice cream supply chain
                            </option>
                            <option value="cloth">
                                cloth supply chain
                            </option>
                        </select>
                    </div>
                    <br/><br/>
                    <div>
                        <button type="submit" className='btn'><Link to='/selectSupplyChain/enroll'>Enroll</Link></button>
                    </div>
                </form>
            </article>
        </>
    );
}
