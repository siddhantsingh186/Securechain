import React from 'react';
import "./Nav.scss";
import {NavLink} from 'react-router-dom';

function Nav(props){
  return(
    <div className="nav">
      <div className="nav__header">
        <div className="nav__header__company">
          <p>Secure<span style={{fontWeight:`400`}}>chain</span></p>
        </div>
        <ul className="nav__header__list">
          <NavLink to="/" className="nav__header__list__element"><li>Home</li></NavLink>
          <NavLink to = "/about" className="nav__header__list__element"> <li>About</li></NavLink>
          <NavLink to = "/selectsupplychain" className="nav__header__list__element"> <li>Product</li></NavLink>
        </ul>
      </div>
    </div>
  );
}
export default Nav;
