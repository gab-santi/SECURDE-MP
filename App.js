import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from "react-router-dom";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Home from './Home/Home.js';
import Navbar from './Navbar/Navbar.js';
import Login from './Login/Login.js';
import Signup from './Signup/Signup.js';
import Shop from './Shop/Shop.js';
import Cart from './Cart/Cart.js';
import Product from './Product/Product.js';
import Accounts from './Accounts/Accounts.js';
import Products from './Products/Products.js';
import Track from './Track/Track.js';
import Log from './Log/Log.js';
import ForgotPw from './Login/ForgotPw.js';

var Parse = require('parse');

Parse.initialize("securdemp",);
Parse.serverURL = 'https://marsh-month.glitch.me/parse';
Parse.masterKey = 'securdemp1234';
Parse.appName = 'securedemp';
Parse.publicServerURL = 'https://marsh-month.glitch.me/parse';
Parse.emailAdapter = {
	module: '@parse/simple-mailgun-adapter',
			 options: {
					 // The address that your emails come from
					 fromAddress: 'admin@securdemp.com',
					 // Your domain from mailgun.com
					 domain: 'postmaster@securde.mp.com',
					 // Your API key from mailgun.com
					 apiKey: 'key-274f30a73d26041581dc25281a53a4d8',
			 }
}
console.log(Parse.User.current());

class App extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

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
					<Route path="/identify" component={ForgotPw}/>
          { Parse.User.current() != null ? (
                Parse.User.current().get('admin') == true ?
                    (<div><Route path="/track" component={Track}/>
                    <Route path="/accounts" component={Accounts}/>
                    <Route path="/products" component={Products}/>
                    <Route path="/log" component={Log}/></div>)
                    : ""
                )
                : ""
          }
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
