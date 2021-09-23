import React from 'react';
import { NavLink } from 'react-router-dom'
import "./createsupplyhome.scss";
function Createsupplyhome(){
  return(
    <div className = "createsupplyhome">
      <h1 className = "createsupplyhome__head">Create Supply Chain</h1>
      <div className = "createsupplyhome__top">
        <h2 className = "createsupplyhome__top__head">Name</h2><br></br>
        <textarea className ="createsupplyhome__top__text" rows={2} cols={40}></textarea>
      </div>
      <div className = "createsupplyhome__bottom">
        <h2 className = "createsupplyhome__bottom__head">Description</h2><br></br>
        <textarea className ="createsupplyhome__bottom__text" rows={8} cols={50}></textarea>
      </div>
      <button className = "createsupplyhome__button"><NavLink to="/createsupply">Create Supply Chain</NavLink></button>
    </div>
  );
}
export default Createsupplyhome;
