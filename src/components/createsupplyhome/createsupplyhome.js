import React , {useState} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import "./createsupplyhome.scss";
function Createsupplyhome(){
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
    axios
      .post('https://securechain-backend.herokuapp.com/supplychain/', data)
      .then((res) => {
       console.log('api response 🚀', res)
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
        <h2 className = "createsupplyhome__top__head">Name</h2><br></br>
        <textarea className ="createsupplyhome__top__text" rows={2} cols={40} onChange={event => handleName(event)}></textarea>
      </div>
      <div className = "createsupplyhome__bottom">
        <h2 className = "createsupplyhome__bottom__head">Description</h2><br></br>
        <textarea className ="createsupplyhome__bottom__text" rows={8} cols={50} onChange={event => handleDetails(event)}></textarea>
      </div>
      <button className = "createsupplyhome__button"><NavLink to="/createsupply" onClick = {event => handleSubmit(event, name, details)}>Save and Continue</NavLink></button>
    </div>
  );
}
export default Createsupplyhome;
