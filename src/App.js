import React, {Component} from 'react';
import Home from './components/home/Home';
import Nav from './components/header/Nav';
import About from "./components/about/About";
import Error from "./components/error/Error";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
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
