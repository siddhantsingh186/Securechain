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
    <div className = "createsupply__bottom">
      <h1 className = "createsupply__bottom__head">Create Supply Chain</h1>
        <div className="createsupplyhome">
          <div className="createsupplyhome__big-card">
            <div className="createsupplyhome__row">
              <div className="createsupplyhome__column1">
                <h1 className="createsupplyhome__title"> Supply Chain Details</h1>
                <div className = "createsupplyhome__form-group">
                  <label className = "createsupplyhome__label">Name</label><br></br>
                  <input className ="createsupplyhome__input" onChange={event => handleName(event)}></input>
                </div>
                <div className = "createsupplyhome__form-group">
                  <label className = "createsupplyhome__label">Description</label><br></br>
                  <textarea className ="createsupplyhome__input1" rows={8} cols={50} onChange={event => handleDetails(event)}></textarea>
                </div>
                <button className = "createsupplyhome__column1__button" onClick = {event => handleSubmit(event, name, details)}>Save and Continue</button>
              </div>
              <div className="createsupplyhome__column2">
                  <div className="createsupplyhome__column2__image" style={{ backgroundImage: `url(media/form.jpg)` }}>
                  </div>
              </div>
            </div>
            
          </div>
      </div>
    </div>
  );
}
export default Createsupplyhome;
