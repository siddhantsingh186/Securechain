import React, {Component} from 'react';
import Home from './components/home/Home';
import Nav from './components/header/Nav';
import About from "./components/about/About";
import Error from "./components/error/Error";
import Register from "./components/registration/register";
import Login from "./components/registration/login";
import Dashboard from "./components/dashboard/Dashboard"
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
