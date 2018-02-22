import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from "react-router-dom";
import Home from './Home/Home.js';
import Navbar from './Navbar/Navbar.js';
import Login from './Login/Login.js';
import Signup from './Signup/Signup.js';
import Shop from './Shop/Shop.js';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <div style={{"margin-top":"10%"}}></div>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/shop" component={Shop}/>
        </Switch>
      </div>
    );
  }
}

export default App;
