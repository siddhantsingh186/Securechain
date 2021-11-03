import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "./Dashboard.scss";
import { useHistory } from 'react-router';

function Dashboard(){
  let history = useHistory();
  const handleClick = (event) => {
    history.push('/createsupplyhome');
  }
  let token = localStorage.getItem("token");
  const [availablesupply, setavailablesupply] = useState([]);

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
          setavailablesupply(
            res.data
          );
          console.log(res.data);
          })
        .catch((err) => {
            console.log(err)
        })
}, [])
  return(
    <div className = "dashboard">
      <h1 className = "dashboard__head">Dashboard</h1>
      <div className = "chaindisplay">
        {availablesupply.map((d)=>{
          return(
            <div className = "chaindetails">
              <p className = "chainname">{d.name}</p>
              <p className = "chaindetails1">{d.details}</p>
            </div>
          )
        })}
      </div>
      <div className = "dashboard__button">
        <button className = "dashboard__button__style" onClick = {handleClick}>Create New Supply Chain</button>
      </div>
    </div>
  );
}
export default Dashboard;