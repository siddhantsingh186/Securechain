import React from 'react'
import './Home.scss';
function Home(){
  return(
    <div className = "home">
      <div className="home__above">
        <div className="home__above__image" style={{backgroundImage:`url(media/home.jpg)`}}>
          <div className="home__above__image__text">
            <div className="home__above__image__text__container">
              <h1 className="home__above__image__text__container__head">Building Safe and Transparent Supply Chains</h1>
              <p className="home__above__image__text__container__paragraph">A decentralized blockchain-based application to manage the flow of goods and services in a supply chain.</p>
              {/* <div className="home__above__image__text__container__button">
                <button className="home__above__image__text__container__button__button1"type="button">Learn More</button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="home__below">
        <ul className="home__below__list">
          <li className="home__below__list__item">Decentralized Access</li>
          <li className="home__below__list__item">Monitoring feature</li>
          <li className="home__below__list__item">Security</li>
          <li className="home__below__list__item">Customizable templates</li>
        </ul>
      </div>
    </div>
  );
}
export default Home;
