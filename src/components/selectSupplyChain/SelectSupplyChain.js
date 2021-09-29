import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import Enroll from '../enroll/Enroll';
import {Link} from 'react-router-dom';
import './SelectSupplyChain.scss';
const SelectSupplyChain = () => {
    const [supplyChain, setSupplyChain] = useState([])
    const [selectedSupplyChain, setSelectedSupplyChain] = useState('')
    const [linkto, setLinkto] = useState('')
    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(selectedSupplyChain)
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
                            name="supplyChains"
                            id="supplyChains"
                            onChange={(e) => {setSelectedSupplyChain(e.target.value)}}
                        >
                            <option value="">
                                Choose
                            </option>
                            {supplyChain.map((supplychain) => {
                                return(
                                    <option key={supplychain.id} value={supplychain}>
                                        {supplychain.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <br/><br/>
                    <button type="submit" className='btn'>Select and Continue</button>
                    <br/><br/>
                </form>
            </article>
        </>
    )
}
export default SelectSupplyChain;