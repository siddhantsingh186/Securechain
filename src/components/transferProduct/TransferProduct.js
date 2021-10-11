import React from 'react'
import axios from 'axios';
import './TransferProduct.scss'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const TransferProduct = () => {

    let token = localStorage.getItem("token");

    const [supplyChain, setSupplyChain] = useState([]);
    const [transferSupplyChain, setTransferSupplyChain] = useState({});
    const [transferInstance, setTransferInstance] = useState({});
    const [transferUnits, setTransferUnits] = useState();

    useEffect(() => {
        axios
            .get('https://securechain-backend.herokuapp.com/supplychain/',
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                }
            )
            .then((res) => {
                if (res) {
                    setSupplyChain(res.data);
                    console.log(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return(
        <div className="createsupply__bottom">
            <h1 className = "createsupply__bottom__head">Transfer Product</h1>
            <div className = "createsupplyflow">
                    <form>
                        <div className="createsupplyflow__form-group">
                            <label className="createsupplyflow__label">Select Supply Chain : </label>
                            <select
                                className="createsupplyflow__input"
                                name="supplyChains"
                                id="supplyChains"
                                onChange={(e) => { setTransferSupplyChain(e.target.value) }}
                            >
                                <option value="">
                                    Choose
                                </option>
                                {supplyChain.map((supplychain) => {
                                    return (
                                        <option key={supplychain.id} value={supplychain.id}>
                                            {supplychain.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <h1 className="createsupplyflow__title">Reciever's Details</h1>
                        <div className="createsupplyflow__form-group">
                            <label className="createsupplyflow__label">Select Receiver : </label>
                            <select
                                className="createsupplyflow__input"
                                name="receiver"
                                id="receiver"
                                onChange={(e) => { setTransferInstance(e.target.value) }}
                            >
                                <option>Transporter-1</option>
                                <option>Transporter-2</option>
                                <option>Transporter-3</option>
                                <option>Transporter-4</option>
                            </select>
                        </div>
                        <div className="createsupplyflow__form-group">
                            <label className="createsupplyflow__label">Units to be transferred : </label>
                            <input className="createsupplyflow__input"
                            name="unit"
                            type="number"
                            id="unit"
                            onChange={(e) => { setTransferUnits(e.target.value) }}
                        />
                        </div>
                        
                        <button className="createsupplyflow__button" type="submit" >Start Transaction</button>
                    </form>
            </div>
        </div>
    )
}    
export default TransferProduct
