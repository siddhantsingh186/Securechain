import React from 'react'
import './request.scss'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { useHistory } from 'react-router';


const Request = () => {
    // let token = localStorage.getItem("token");
    // let username = localStorage.getItem("username");

    // const [supplyChain, setSupplyChain] = useState([]);
    // const [productSupplyChain, setProductSupplyChain] = useState("");
    // const [productName, setProductName] = useState("");
    // const [productBatches, setProductBatches] = useState("");
    // const [productBatchSize, setProductBatchSize] = useState("");
    // const [batches, setBatches] = useState("");
    // const [issubmit, setIssubmit] = useState(false);

    // useEffect(() => {
    //     axios
    //         .get('https://securechain-backend.herokuapp.com/supplychain/',
    //             {
    //                 headers: {
    //                     Authorization: `Token ${token}`
    //                 }
    //             }
    //         )
    //         .then((res) => {
    //             if (res) {
    //                 setSupplyChain(res.data);
    //                 console.log(res.data)
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }, [])

    // useEffect(() => {
    //     if(issubmit){
    //         let today = new Date();
    //         let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    //         let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //         let dateTime = date + '_' + time;
    //         let productNo = productName + '_' + productSupplyChain + '_' + dateTime;
    //         console.log(currentBatchesInOwnership(productNo, parseInt(productSupplyChain)))
    //     }
    // }, [issubmit])

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     let today = new Date();
    //     let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    //     let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //     let dateTime = time + '_' + date;
    //     let productNo = productName + '_' + productSupplyChain + '_' + dateTime;
    //     console.log(productNo);
    //     console.log(productName);
    //     console.log(parseInt(productBatchSize));
    //     console.log(productSupplyChain);
    //     console.log(username);
    //     addProduct(productNo, productName, parseInt(productBatches), parseInt(productBatchSize), parseInt(productSupplyChain), username, dateTime);
    //     setIssubmit(!issubmit)
    // }
    return(
        <div className="createsupply__bottom">
            <h1 className = "createsupply__bottom__head">Create Product</h1>
            <div className = "request">
                <div className="request__row">
                    <div className = "request__big-card">
                        <div className="request__title">
                            <p>Krishna Transporters wants to send you 20 batches of vials!</p>
                        </div>
                        <div className="request__content">
                            <p className="request__key"><strong className="request__key__bold">Sender's Name : </strong>Krishna Transporters</p>
                            <p className="request__key"><strong className="request__key__bold">Supply Chain : </strong>Vaccine Supply Chain</p>
                            <p className="request__key"><strong className="request__key__bold">Product Name : </strong>Vials</p>
                            <p className="request__key"><strong className="request__key__bold">Number of batches : </strong>100</p>
                            <p className="request__key"><strong className="request__key__bold">Number of uints in one batch : </strong>1000</p>
                            <p className="request__key"><strong className="request__key__bold">Transaction Date : </strong>19/11/2021</p>
                        </div>
                        <div className="request__row">
                            <div className="request__column">
                                <button className="request__button__accept" type="submit" >Accept</button>
                            </div>
                            
                            <div className="request__column">
                                <button className="request__button__decline" type="submit" >Decline</button>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}    
export default Request
