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
  const handleJoin = (event) => {
    history.push('/selectsupplychain');
  }
  let token = localStorage.getItem("token");
  const [ownedsupplychain, setownedsupplychain] = useState([]);
  const [enrolledsupplychain, setenrolledsupplychain] = useState([]);

  useEffect(() => {
    axios
        .get('https://securechain-backend.herokuapp.com/mysupplychain/',
            {
                headers: {
                    Authorization: `Token ${token}`
                }
            }
        )
        .then((res) => {
          setownedsupplychain(
            res.data
          );
          console.log(res.data);
          })
        .catch((err) => {
            console.log(err)
        })
}, [])

  useEffect(() => {
    axios
        .get('https://securechain-backend.herokuapp.com/enrolledsupplychain/',
            {
                headers: {
                    Authorization: `Token ${token}`
                }
            }
        )
        .then((res) => {
          setenrolledsupplychain(
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
      <h1 className = "ownedsupply">Owned Supply Chain</h1>
      <div className = "chaindisplay">
        {ownedsupplychain.map((d)=>{
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
      <h1 className = "enrolledsupply">Enrolled Supply Chain</h1>
      <div className = "chaindisplay">
        {enrolledsupplychain.map((d)=>{
          return(
            <div className = "chaindetails">
              <p className = "chainname">{d.name}</p>
              <p className = "chaindetails1">{d.details}</p>
            </div>
          )
        })}
      </div>
      <div className = "dashboard__button">
        <button className = "dashboard__button__style" onClick = {handleJoin}>Join A Supply Chain</button>
      </div>
    </div>
  );
}
export default Dashboard;