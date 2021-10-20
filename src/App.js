import React, {Component} from 'react';
import Home from './components/home/Home';
import Nav from './components/header/Nav';
import About from "./components/about/About";
import Error from "./components/error/Error";
import Register from "./components/registration/register";
import Login from "./components/registration/login";
import Dashboard from "./components/dashboard/Dashboard";
import Createsupply from "./components/createsupplychain/createsupply";
import Selectsupplychain from "./components/selectSupplyChain/SelectSupplyChain";
import Enroll from "./components/enroll/Enroll";
import Createsupplyhome from "./components/createsupplyhome/createsupplyhome";
import Createsupplyflow from "./components/createsupplyflow/createsupplyflow";
import TransferProduct from "./components/transferProduct/TransferProduct";
import CreateProduct from "./components/createProduct/CreateProduct";
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
          <Route exact path="/createsupplyflow">
            <Createsupplyflow />
          </Route>
          <Route exact path="/selectsupplychain">
            <Selectsupplychain />
          </Route>
          <Route exact path="/selectsupplychain/enroll">
            <Enroll />
          </Route>
          <Route exact path="/createsupplyhome">
            <Createsupplyhome />
          </Route>
          <Route exact path="/transferproduct">
            <TransferProduct />
          </Route>
          <Route exact path="/createproduct">
            <CreateProduct />
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
