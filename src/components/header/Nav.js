import React from 'react';
import "./Nav.scss";
import GoogleLogin from 'react-google-login';
import {NavLink} from 'react-router-dom';

function Nav(props){
  const responseGoogle = (response)=>{
    console.log(response);
  }
  return(
    <div className="nav">
      <div className="nav__header">
        <div className="nav__header__company">
          <p>Secure<span style={{fontWeight:`400`}}>chain</span></p>
        </div>
        <ul className="nav__header__list">
          <NavLink to="/home" className="nav__header__list__element"><li>Home</li></NavLink>;
          <NavLink to = "/about" className="nav__header__list__element"> <li>About</li></NavLink>
          <NavLink to = "/product" className="nav__header__list__element"> <li>Product</li></NavLink>
        </ul>
        <GoogleLogin className="nav__header__button"
        clientId="1032167174701-bscvulohd5d6lpppmga4341uguhvma86.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        />
      </div>
    </div>
  );
}
export default Nav;
