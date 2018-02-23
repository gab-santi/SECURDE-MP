import React, { Component } from 'react';
import '../css/main.css';
import '../css/bootstrap/css/bootstrap.min.css';
import { Switch, Route, Link , Redirect} from "react-router-dom";

var Parse = require('parse');

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state={loggedIn:false};

    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    if(Parse.User.current() != null)
      this.setState({loggedin:true});
  }

  logout(){
    Parse.User.logOut().then(() => {
      this.setState({loggedIn:false});
      window.location.href = "/";
    });
  }

  render(){
    var LinkStyle = {color: '#333333'};
    return(
      <div class="container-menu-header">
        <div class="wrap_header">
          <a href="index.html" class="logo">
      			<img src="../images/icons/logo.png" alt="IMG-LOGO"/>
      		</a>
          <div class="wrap_menu">
      			<nav class="menu">
      				<ul class="main_menu">
      					<li>
      						<a href="#">
                    <Link to="/" style={LinkStyle}>Home</Link>
                  </a>
      					</li>
      					<li>
      						<a href="#">
                    <Link to="/Shop" style={LinkStyle}>Shop</Link>
                  </a>
      					</li>

      					<li>
                <a href="#">
                  <Link to="/Cart" style={LinkStyle}>Cart</Link>
                </a>
      					</li>

      					<li>
      						<a href="about.html">About</a>
      					</li>

      					<li>
      						<a href="contact.html">Contact</a>
      					</li>
      				</ul>
      			</nav>
      		</div>
          <div class="header-icons">
            { Parse.User.current() != null ? (
            <ul style={{"display":"flex","list-style":"none","align-items":"right"}}>
              <li>
                <Link to="#">{Parse.User.current().get('username')}</Link>
              </li>
              <span class="linedivide1"></span>
              <li>
                <Link to="#" onClick={this.logout}>Logout</Link>
              </li>
            </ul>
            ) : (
            <ul style={{"display":"flex","list-style":"none","align-items":"right"}}>
              <li>
                <a href="#">
                  <Link to="/signup">SIGNUP</Link>
                </a>
              </li>
              <span class="linedivide1"></span>
              <li>
                <a href="#">
                  <Link to="/login">LOGIN</Link>
                </a>
              </li>
            </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar
