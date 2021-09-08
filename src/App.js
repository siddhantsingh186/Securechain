import React, {Component} from 'react';
import Home from './components/home/Home';
import Nav from './components/header/Nav';
import About from "./components/about/About";
import Register from "./components/registration/register";
import Login from "./components/registration/login";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className = "app">
      <Router>
        <Route path="/" component={Nav}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path = "/about" component = {About}></Route>
        <Route exact path = "/register" component = {Register}></Route>
        <Route exact path = "/login" component = {Login}></Route>
        {/* <Redirect to ="/home" /> */}
      </Router>
    </div>
    )
  }
}

export default App;
