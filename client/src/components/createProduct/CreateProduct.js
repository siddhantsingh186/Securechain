import React from 'react'
import './CreateProduct.scss'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { useHistory } from 'react-router';


const CreateProduct = ({addProduct, currentBatchesInOwnership}) => {
    let token = localStorage.getItem("token");
    let username = localStorage.getItem("username");

    const [supplyChain, setSupplyChain] = useState([]);
    const [productSupplyChain, setProductSupplyChain] = useState("");
    const [productName, setProductName] = useState("");
    const [productBatches, setProductBatches] = useState("");
    const [productBatchSize, setProductBatchSize] = useState("");
    const [batches, setBatches] = useState("");
    const [issubmit, setIssubmit] = useState(false);

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

    useEffect(() => {
        if(issubmit){
            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date + '_' + time;
            let productNo = productName + '_' + productSupplyChain + '_' + dateTime;
            console.log(currentBatchesInOwnership(productNo, parseInt(productSupplyChain)))
        }
    }, [issubmit])

    const handleSubmit = (e) => {
        e.preventDefault();
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + '_' + time;
        let productNo = productName + '_' + productSupplyChain + '_' + dateTime;
        console.log(productNo);
        console.log(productName);
        console.log(parseInt(productBatchSize));
        console.log(productSupplyChain);
        console.log(username);
        addProduct(productNo, productName, parseInt(productBatches), parseInt(productBatchSize), parseInt(productSupplyChain), username, dateTime);
        setIssubmit(!issubmit)
    }
    return(
        <div className="createsupply__bottom">
            <h1 className = "createsupply__bottom__head">Create Product</h1>
            <div className = "createproduct">
                <div className = "createproduct__big-card">
                <div className="createproduct__row">
                    <form className="createproduct__column" onSubmit={handleSubmit}>
                        <div className="createproduct__form-group">
                            <label className="createproduct__label">Select Supply Chain : </label>
                            <select className="createproduct__input"
                                name="supplyChains"
                                id="supplyChains"
                                onChange={(e) => { setProductSupplyChain(e.target.value) }}
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
                        <h1 className="createproduct__title"> Product Details</h1>
                        <div className="createproduct__form-group">
                            <label className="createproduct__label">Product Name : </label>
                            <input className="createproduct__input"
                                name="name"
                                type="text"
                                id="name"
                                onChange={(e) => {setProductName(e.target.value)}}
                            />
                        </div>
                        <div className="createproduct__form-group">
                            <label className="createproduct__label">Batches manufactured : </label>
                            <input className="createproduct__input"
                                name="batches"
                                type="number"
                                id="batches"
                                onChange={(e) => { setProductBatches(e.target.value) }}
                            />
                        </div>
                        <div className="createproduct__form-group">
                            <label className="createproduct__label">Number of units in a batch : </label>
                            <input className="createproduct__input"
                                name="batchsize"
                                type="number"
                                id="batchsize"
                                onChange={(e) => { setProductBatchSize(e.target.value) }}
                            />
                        </div>
                        
                        <button className="createproduct__button" type="submit" >Add Product</button>

                        
                    </form>
                    <div className="createproduct__column">
                        <div className="createproduct__column__image" style={{ backgroundImage: `url(media/create.jpg)` }}>

                    </div>
                        </div>
                </div>
                </div>
            </div>
        </div>
    )
}    
export default CreateProduct
