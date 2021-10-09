import React from 'react'
import './createProduct.scss'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Axios from 'axios'

const CreateProduct = () => {
    return(
        <div className="createsupply__bottom">
            <h1 className = "createsupply__bottom__head">Create Product</h1>
            <div className = "createsupplyflow">
                    <form>
                        <div className="form-group">
                            <label>Select Supply Chain : </label>
                            <select>
                                <option>Vaccine Supply Chain</option>
                                <option>Milk Supply Chain</option>
                                <option>Car Supply Chain</option>
                                <option>Bottle Supply Chain</option>
                            </select>
                        </div>
                        <h1> Product Details</h1>
                        <div className="form-group">
                            <label>Product Name : </label>
                            <input name="name" type="text" id="name"></input>
                        </div>
                        <div className="form-group">
                            <label>Units Manufactured : </label>
                            <input name="unit" type="text" id="unit"></input>
                        </div>
                        
                        <button className="formButton" type="submit" >Add Product</button>
                    </form>
            </div>
        </div>
    )
}    
export default CreateProduct
