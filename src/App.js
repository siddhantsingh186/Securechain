import React, {Component} from 'react';
import Home from './components/home/Home';
import Nav from './components/header/Nav';
import About from "./components/about/About";
import Error from "./components/error/Error";
import Register from "./components/registration/register";
import Login from "./components/registration/login";
import Dashboard from "./components/dashboard/Dashboard";
import Createsupply from "./components/createSupplyChain/createsupply";
import Selectsupplychain from "./components/selectSupplyChain/SelectSupplyChain";
import Createsupplyhome from "./components/createsupplyhome/createsupplyhome";
import Createsupplyflow from "./components/createsupplyflow/createsupplyflow";
import Enroll from "./components/enroll/Enroll";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className = "app">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/createsupply">
            <Createsupply />
          </Route>
          <Route exact path="/selectsupplychain">
            <Selectsupplychain />
          </Route>
          <Route exact path="/createsupplyhome">
            <Createsupplyhome />
          </Route>
          <Route exact path="/createsupplyflow">
            <Createsupplyflow />
          </Route>
          <Route exact path="/enroll">
            <Enroll />
          </Route>
          <Route path = "*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </div>
    )
  }
}

export default App;
