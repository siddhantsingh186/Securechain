import React from 'react';
import "./Dashboard.scss";
import { useHistory } from 'react-router';

function Dashboard(){
  let history = useHistory();
  const handleClick = (event) => {
    history.push('/createsupplyhome');
  }
  return(
    <div className = "dashboard">
      <h1 className = "dashboard__head">Dashboard</h1>
      <div className = "dashboard__below">
        <div className = "dashboard__below__element">
          <h2 className = "dashboard__below__element__head">Vaccine Supply Chain</h2>
          <p className = "dashboard__below__element__body">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, <br />when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>
        <div className = "dashboard__below__element">
          <h2 className = "dashboard__below__element__head">Milk Supply Chain</h2>
          <p className = "dashboard__below__element__body">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, <br />when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>
      </div>
      <div className = "dashboard__button">
        <button className = "dashboard__button__style" onClick = {handleClick}>Create New Supply Chain</button>
      </div>
    </div>
  );
}
export default Dashboard;
