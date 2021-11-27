import React, { useState,useEffect } from 'react';
import "./Nav.scss";
import {NavLink} from 'react-router-dom';


function Nav(props){
  const [isopen, setisopen] = useState(false);
  const loginOut = props.AuthState?(<NavLink to="/" ><button onClick = {props.logout} className={isopen ? "nav__header__notlist__element" : "nav__header__list__button"}>LOGOUT</button></NavLink>):(<NavLink to="/login"><button className={isopen ? "nav__header__notlist__element" : "nav__header__list__button"}>LOGIN</button></NavLink>);
    return(
      <div className="nav">
        <div className="nav__header">
          <div className="nav__header__company">
            <p>Secure<span style={{fontWeight:`400`}}>chain</span></p>
          </div>
          <ul className={isopen ? "nav__header__notlist" : "nav__header__list"} 
            onClick = {() => setisopen(false)}>
              <NavLink to="/" className={isopen ? "nav__header__notlist__element" : "nav__header__list__element"}><li>Home</li></NavLink>
              <NavLink to = "/progress" className={isopen ? "nav__header__notlist__element" : "nav__header__list__element"}> <li>Track Product</li></NavLink>
              {loginOut}
          </ul>
          <button className = "hamburger" onClick = {() => setisopen(!isopen)}>
            {isopen ? <i className = "fas fa-times"></i> : <i className = "fas fa-bars"></i>}
          </button>
        </div>
      </div>
    );
}
export default Nav;