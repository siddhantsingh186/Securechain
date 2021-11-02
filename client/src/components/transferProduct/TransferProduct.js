import React from 'react'
import axios from 'axios';
import './TransferProduct.scss'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const TransferProduct = () => {
    let supplychainid = -1;
    let token = localStorage.getItem("token");

    const [supplyChain, setSupplyChain] = useState([]);
    const [allowedRecievers,setAllowedRecievers] = useState([]);
    const [transferSupplyChain, setTransferSupplyChain] = useState({});
    const [transferInstance, setTransferInstance] = useState({});
    const [transferUnits, setTransferUnits] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        let productNo = productName + '_' + transferSupplyChain
        console.log(productName);
        console.log(parseInt(productBatchSize));
        console.log(productSupplyChain);
        transferProduct(productNo, productName, batchesToTransfer, transferSupplyChain, transferInstance);
    }

    useEffect(() => {
        axios
            .get('https://securechain-backend.herokuapp.com/enrolledsupplychain/',
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
        // axios
        //     .get('https://securechain-backend.herokuapp.com/allowedreceivers/',
        //         {
        //             headers: {
        //                 Authorization: `Token ${token}`
        //             }
        //         }
        //     )
        //     .then((res) => {
        //         if (res) {
        //             setAllowedRecievers(res.data);
        //             console.log(res.data)
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
    }, [])

    const handleRecievers = (e) => {
        supplychainid = e.target.value;
        console.log(supplychainid)
        setTransferSupplyChain(e.target.value)
        axios
            .get('http://securechain-backend.herokuapp.com/allowedreceivers/'+supplychainid+'/',
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                }
            )
            .then((res) => {
                if (res) {
                    setAllowedRecievers(res.data);
                    console.log(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    };


    return(
        <div className="createsupply__bottom">
            <h1 className = "createsupply__bottom__head">Transfer Product</h1>
            <div className = "transferproduct">
                <div class = "transferproduct__big-card">
                    <div class="transferproduct__row">
                        <form class="transferproduct__column">
                            <div className="transferproduct__form-group">
                                <label className="transferproduct__label">Select Supply Chain : </label>
                                <select
                                    className="transferproduct__input"
                                    name="supplyChains"
                                    id="supplyChains"
                                    // onChange={(e) => { setTransferSupplyChain(e.target.value) }}
                                    onChange={handleRecievers}
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
                            <h1 className="transferproduct__title">Reciever's Details</h1>
                            <div className="transferproduct__form-group">
                                <label className="transferproduct__label">Select Receiver : </label>
                                <select
                                    className="transferproduct__input"
                                    name="receiver"
                                    id="receiver"
                                    onChange={(e) => { setTransferInstance(e.target.value) }}
                                >
                                    <option>Choose</option>
                                    {allowedRecievers.map((allowed) => {
                                        return (
                                            <option key={allowed.id} value={allowed.id}>
                                                {allowed.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="transferproduct__form-group">
                                <label className="transferproduct__label">Batches to be transferred : </label>
                                <input className="transferproduct__input"
                                name="unit"
                                type="number"
                                id="unit"
                                onChange={(e) => { setTransferUnits(e.target.value) }}
                            />
                            </div>
                            
                            <button className="transferproduct__button" type="submit" >Start Transaction</button>
                        </form>
                        <div class="transferproduct__column">
                            <div class="transferproduct__column__image" style={{ backgroundImage: `url(media/transfer1.jpg)` }}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}    
export default TransferProduct
