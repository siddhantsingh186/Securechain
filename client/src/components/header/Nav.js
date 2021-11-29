import React, { useState,useEffect } from 'react';
import "./Nav.scss";
import {NavLink} from 'react-router-dom';
import { create } from '@mui/material/styles/createTransitions';
import { useHistory } from 'react-router';


function Nav(props){
  let history = useHistory();
  const handleLogout = () => {
    props.logout();
    history.push('/');
  }
  const handleLogin = () => {
    history.push('/login');
  }
  const [isopen, setisopen] = useState(false);
  const loginOut = props.AuthState?(<button onClick = {handleLogout} className={isopen ? "nav__header__notlist__element" : "nav__header__list__button"}>LOGOUT</button>):(<button onClick={handleLogin} className={isopen ? "nav__header__notlist__element" : "nav__header__list__button"}>LOGIN</button>);
  const createProduct = props.AuthState ? (
    <NavLink to = "/createProduct" className={isopen ? "nav__header__notlist__element" : "nav__header__list__element"}> <li>Create Product</li></NavLink>
  ) : null
  const transferProduct = props.AuthState ? (
    <NavLink to = "/transferProduct" className={isopen ? "nav__header__notlist__element" : "nav__header__list__element"}> <li>Transfer Product</li></NavLink>
  ) : null
  
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
              {createProduct}
              {transferProduct}
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