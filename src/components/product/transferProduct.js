import React from 'react'
import './createProduct.scss'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Axios from 'axios'

const TransferProduct = () => {
    return(
        <div className="createsupply__bottom">
            <h1 className = "createsupply__bottom__head">Transfer Product</h1>
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
                        <h1>Reciever's Details</h1>
                        <div className="form-group">
                            <label>Select Reciever : </label>
                            <select>
                                <option>Transporter-1</option>
                                <option>Transporter-2</option>
                                <option>Transporter-3</option>
                                <option>Transporter-4</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Units to be transferred : </label>
                            <input name="unit" type="number" id="unit"></input>
                        </div>
                        
                        <button className="formButton" type="submit" >Start Transaction</button>
                    </form>
            </div>
        </div>
    )
}    
export default TransferProduct
