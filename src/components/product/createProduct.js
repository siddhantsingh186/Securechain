import React from 'react'
import './createProduct.scss'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Axios from 'axios';

const CreateProduct = () => {

    let token = localStorage.getItem("token");

    const [supplyChain, setSupplyChain] = useState([]);
    const [productSupplyChain, setProductSupplyChain] = useState({});
    const [productName, setProductName] = useState({});
    const [productUnits, setProductUnits] = useState({});

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
            <div className = "createsupplyflow">
                    <form>
                        <div className="form-group">
                            <label>Select Supply Chain : </label>
                            <select
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
                        <h1> Product Details</h1>
                        <div className="form-group">
                            <label>Product Name : </label>
                            <input 
                                name="name"
                                type="text"
                                id="name"
                                onChange={(e) => {setProductName(e.target.value)}}
                            />
                        </div>
                        <div className="form-group">
                            <label>Units Manufactured : </label>
                            <input
                                name="unit"
                                type="text"
                                id="unit"
                                onChange={(e) => { setProductUnits(e.target.value) }}
                            />
                        </div>
                        
                        <button className="formButton" type="submit" >Add Product</button>
                    </form>
            </div>
        </div>
    )
}    
export default CreateProduct
