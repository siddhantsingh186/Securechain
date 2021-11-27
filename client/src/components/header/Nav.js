import React, { useState,useEffect } from 'react';
import "./Nav.scss";
import {NavLink} from 'react-router-dom';


function Nav(props){
  const [isopen, setisopen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState({});
  useEffect(() => {
        setInterval(() => {
            const userString = localStorage.getItem("token");
            const user = JSON.parse(userString);
            setIsLoggedIn(user);
            }, [])
    }, 5);
  const logout = () => {
    return localStorage.removeItem("token");
  }
  if(!isLoggedIn){
    return(
      <div className="nav">
        <div className="nav__header">
          <div className="nav__header__company">
            <p>Secure<span style={{fontWeight:`400`}}>chain</span></p>
          </div>
          <ul className={isopen ? "nav__header__notlist" : "nav__header__list"} 
            onClick = {() => setisopen(false)}>
              <NavLink to="/" className={isopen ? "nav__header__notlist__element" : "nav__header__list__element"}><li>Home</li></NavLink>
              <NavLink to = "/about" className={isopen ? "nav__header__notlist__element" : "nav__header__list__element"}> <li>About</li></NavLink>
              <NavLink to = "/selectsupplychain" className={isopen ? "nav__header__notlist__element" : "nav__header__list__element"}> <li>Product</li></NavLink>
              <button><NavLink to = "/login">Login</NavLink></button>
              <button><NavLink to = "/register">Signup</NavLink></button>
          </ul>
          <button className = "hamburger" onClick = {() => setisopen(!isopen)}>
            {isopen ? <i className = "fas fa-times"></i> : <i className = "fas fa-bars"></i>}
          </button>
        </div>
      </div>
    );
  }

  if(isLoggedIn){
    return(
      <div className="nav">
        <div className="nav__header">
          <div className="nav__header__company">
            <p>Secure<span style={{fontWeight:`400`}}>chain</span></p>
          </div>
          <ul className={isopen ? "nav__header__notlist" : "nav__header__list"} 
            onClick = {() => setisopen(false)}>
              <NavLink to="/" className={isopen ? "nav__header__notlist__element" : "nav__header__list__element"}><li>Home</li></NavLink>
              <NavLink to = "/about" className={isopen ? "nav__header__notlist__element" : "nav__header__list__element"}> <li>About</li></NavLink>
              <NavLink to = "/selectsupplychain" className={isopen ? "nav__header__notlist__element" : "nav__header__list__element"}> <li>Product</li></NavLink>
              <button><NavLink to = "/" onClick={logout}>Logout</NavLink></button>
          </ul>
          <button className = "hamburger" onClick = {() => setisopen(!isopen)}>
            {isopen ? <i className = "fas fa-times"></i> : <i className = "fas fa-bars"></i>}
          </button>
        </div>
      </div>
    );
  }
}
export default Nav;