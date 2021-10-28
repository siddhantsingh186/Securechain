import React from 'react'
import './CreateProduct.scss'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';


const CreateProduct = () => {

    let token = localStorage.getItem("token");

    const [supplyChain, setSupplyChain] = useState([]);
    const [productSupplyChain, setProductSupplyChain] = useState({});
    const [productName, setProductName] = useState({});
    const [productBatches, setProductBatches] = useState({});
    const [productBatchSize, setProductBatchSize] = useState({});

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
            <h1 className = "createsupply__bottom__head">Create Product</h1>
            <div className = "createproduct">
                <div class = "createproduct__big-card">
                <div class="createproduct__row">
                    <form class="createproduct__column">
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
                </div>
                </div>
            </div>
        </div>
    )
}    
export default CreateProduct
