import React, { Component } from 'react';
import '../css/main.css';
import '../css/bootstrap/css/bootstrap.min.css';
import { Switch, Route, Link , Redirect} from "react-router-dom";

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state={loggedIn:false};
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
      						<a href="product.html">Sale</a>
      					</li>

      					<li>
      						<a href="cart.html">Features</a>
      					</li>

      					<li>
      						<a href="blog.html">Blog</a>
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
            <ul style={{"display":"flex","list-style":"none","align-items":"right"}}>
            { this.state.loggedIn ?
              (<li>
                <a href="#">USERNAME</a>
              </li>)
              : <li>
                <a href="#">
                  <Link to="/signup">SIGNUP</Link>
                </a>
              </li>
            }
              <span class="linedivide1"></span>
              <li>
                <a href="#">
                  <Link to="/login">LOGIN</Link>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar
