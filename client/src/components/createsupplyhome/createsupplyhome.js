import React , {useState} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import "./createsupplyhome.scss";
import {useEffect} from 'react';
import { useHistory } from 'react-router';


function Createsupplyhome(){
  let history = useHistory();
  const [name,setName] = useState('');
  const [details,setDetails] = useState('');
  const handleSubmit = (event, name, details) => {
    let data = {
      name : name,
      details : details
    }
    event.preventDefault();
    console.log("Name", name);
    console.log("Details", details);
    console.log(JSON.stringify(data, null, 4));
    let token = localStorage.getItem("token")

    axios.post("https://securechain-backend.herokuapp.com/supplychain/",data ,
                {
                  headers: {
                        Authorization: `Token ${token}`,
                    }
                }
            )
      .then((res) => {
       console.log('api response 🚀', res)
       localStorage.setItem("supply_chain", res.data.id)
       alert("Details sent Successfully");
       history.push('/createsupply');
      })
      .catch((error) => {
        console.error(error.response)
      })
  };
  const handleName = (event) =>{
    setName(event.target.value);
  }
  const handleDetails = (event) => {
    setDetails(event.target.value);
  }
  return(
    <div className = "createsupplyhome">
      <h1 className = "createsupplyhome__head">Create Supply Chain</h1>
      <div className = "createsupplyhome__top">
        <h1 className = "createsupplyhome__top__head1">Name</h1><br></br>
        <textarea className ="createsupplyhome__top__text" rows={2} cols={40} onChange={event => handleName(event)}></textarea>
      </div>
      <div className = "createsupplyhome__bottom">
        <h1 className = "createsupplyhome__bottom__head1">Description</h1><br></br>
        <textarea className ="createsupplyhome__bottom__text" rows={8} cols={50} onChange={event => handleDetails(event)}></textarea>
      </div>
      <button className = "createsupplyhome__button" onClick = {event => handleSubmit(event, name, details)}>Save and Continue</button>
    </div>
  );
}
export default Createsupplyhome;