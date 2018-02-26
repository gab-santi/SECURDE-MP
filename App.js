import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from "react-router-dom";
import Home from './Home/Home.js';
import Navbar from './Navbar/Navbar.js';
import Login from './Login/Login.js';
import Signup from './Signup/Signup.js';
import Shop from './Shop/Shop.js';
import Cart from './Cart/Cart.js';
import Product from './Product/Product.js';

var Parse = require('parse');
Parse.initialize("securdemp");
Parse.serverURL = 'https://marsh-month.glitch.me/parse'

console.log(Parse.User.current());

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <div style={{"margin-top":"10%"}}></div>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/shop" component={Shop}/>
          <Route path="/cart" component={Cart}/>
          <Route path="/product" component={Product}/>
          { Parse.User.current() == null
            ?
            <div>
              <Route path="/login" component={Login}/>
              <Route path="/signup" component={Signup}/>
            </div>
            :
            <div>
            </div>
          }
        </Switch>
      </div>
    );
  }
}

export default App;
