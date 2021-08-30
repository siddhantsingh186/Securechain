import React, {Component} from 'react';
import Home from './components/home/Home';
import Nav from './components/header/Nav';
import About from "./components/about/About";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className = "app">
      <Router>
        <Route path="/" component={Nav}></Route>
        <Route path="/home" component={Home}></Route>
        <Route path = "/about" component = {About}></Route>
        <Redirect to ="/home" />
      </Router>
    </div>
    )
  }
}

export default App;
