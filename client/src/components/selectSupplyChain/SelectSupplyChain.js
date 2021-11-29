import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import Enroll from '../enroll/Enroll';
import {Link} from 'react-router-dom';
import './SelectSupplyChain.scss';

const SelectSupplyChain = () => {
    const [supplyChain, setSupplyChain] = useState([])
    const [selectedSupplyChain, setSelectedSupplyChain] = useState()
    const [linkto, setLinkto] = useState('')
    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(e.target.value)
        //console.log(selectedSupplyChain.id)
        if(selectedSupplyChain !== ""){
            localStorage.setItem("supplychain", selectedSupplyChain)
            history.push("/selectsupplychain/enroll")
        }
    }
    /*axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/todos'
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    */
    const retrieveSupplyChain = () => {
        let token = localStorage.getItem("token");
        axios
            .get('https://securechain-backend.herokuapp.com/supplychain/',
                {
                    headers: {
                    Authorization: `Token ${token}`
                }
            }
            )
            .then((res) => {
                if(res){
                    setSupplyChain(res.data);
                    console.log(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        retrieveSupplyChain();
    }, [])

     useEffect(() => {
        console.log(selectedSupplyChain);
    }, [selectedSupplyChain])

    return (
        <>
        <div className="createsupply__bottom">
            <h1 className = "createsupply__bottom__head">Select Supply Chain</h1>
            <div className="selectsupplychain">
                <div className="selectsupplychain__big-card">
                    <article className="selectsupplychain__big-card__article">
                        <form onSubmit={handleSubmit}>
                            <div className='selectsupplychain__formgroup'>
                                <label className='selectsupplychain__label' htmlFor='supplyChain'>
                                    Choose from the following existing supply chains :
                                </label>
                                <br/><br/>
                                <select
                                    name="supplyChains"
                                    id="supplyChains"
                                    className='selectsupplychain__input'
                                    onChange={(e) => {setSelectedSupplyChain(e.target.value)}}
                                >
                                    <option value="">
                                        Choose
                                    </option>
                                    {supplyChain.map((supplychain) => {
                                        return(
                                            <option key={supplychain.id} value={supplychain.id}>
                                                {supplychain.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <br/><br/>
                            <button type="submit" className='selectsupplychain__button'>Select and Continue</button>
                            <br/><br/>
                        </form>
                    </article>
                </div>
                <div className="selectsupplychain__image-card">
                    <div className="selectsupplychain__image-card__image" style={{ backgroundImage: `url(media/ssc.jpg)` }}/>
                </div>
            </div>
        </div>
        </>
    )
}
export default SelectSupplyChain;
