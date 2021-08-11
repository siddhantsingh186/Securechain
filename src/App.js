import React from 'react';
import './App.scss';
import GoogleLogin from 'react-google-login';
//import {NavLink} from 'react-router-dom';

function App(props) {
  const responseGoogle = (response)=>{
    console.log(response);
  }
  return (
    <div className="App">
      <div className="App__header">
        <div className="App__header__company">
          <p>Secure<span style={{fontWeight:`400`}}>chain</span></p>
        </div>
        <ul className="App__header__list">
          <li className="App__header__list__element">Home</li>
          <li className="App__header__list__element">About</li>
          <li className="App__header__list__element">Product</li>
        </ul>
        <GoogleLogin className="App__header__button"
        clientId="1032167174701-bscvulohd5d6lpppmga4341uguhvma86.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        />
      </div>
      <div className="App__above">
        <div className="App__above__image" style={{backgroundImage:`url(media/home.jpg)`}}>
          <div className="App__above__image__text">
            <div className="App__above__image__text__container">
              <h1 className="App__above__image__text__container__head">Building Safe and Transparent Supply Chains</h1>
              <p className="App__above__image__text__container__paragraph">A decentralized blockchain-based application to manage the flow of goods and services in a supply chain.</p>
              <div className="App__above__image__text__container__button">
                <button className="App__above__image__text__container__button__button1"type="button">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="App__below">
        <ul className="App__below__list">
          <li className="App__below__list__item">Decentralized Access</li>
          <li className="App__below__list__item">Monitoring feature</li>
          <li className="App__below__list__item">Security</li>
          <li className="App__below__list__item">Customizable templates</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
