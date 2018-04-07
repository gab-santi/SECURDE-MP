import React, { Component } from 'react';
import '../App.css';
import { Grid, Row, Col, PageHeader, Button, FormGroup, FormControl, ControlLabel, ProgressBar} from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import { withCookies, Cookies } from 'react-cookie';
import ReCAPTCHA from 'react-google-recaptcha';

var Parse = require('parse');
let captcha;
var captchaFlag = false;

class Login extends Component{
  constructor(props){
    super(props);
	this.cookies = new Cookies();

    this.state = {name: '',
                  password: '',
                  loggedIn: ''};

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event){
    this.setState({name:event.target.value});
  }

  handlePasswordChange(event){
    this.setState({password:event.target.value});
  }

  handleSubmit(event){
    var Query = Parse.Object.extend(Parse.User);
    var qry = new Query();

    if (captchaFlag) {
        Parse.User.logIn(this.state.name,this.state.password).then(() => {
            console.log("Login Success");
            this.setState({loggedIn: true});

	       this.cookies.set('cart', []);
	       /* var cart = [];
	       localStorage.setItem("cart", JSON.stringify(cart)); */

            }).catch(function(e){
                console.log("Login Failed");
            })
    } else {
        alert("Accomplish reCaptcha");
    }
    this.setState({name: '',password: ''});
    captcha.reset();
    captchaFlag = false;
  }

  render(){
    var inputBox1Style = {border: '1px solid #e6e6e6', borderRadius: '2px', padding: '10px', color: this.state.unSelect, width: '100%'};
    var inputBox2Style = {border: '1px solid #e6e6e6', borderRadius: '2px', padding: '10px', color: this.state.pwSelect, width: '100%'};
    var submitButtonStyle = { float:"right",marginTop:"10px",backgroundColor:"#E53535", border:"5px solid #E3313F",borderRadius:"3px", width:"100px",height:"3em", "fontFamily":"Century Gothic", "color":"white","fontWeight":"bold"};

    if(this.state.loggedIn){
      return(
        <Redirect to="/"/>
      )
    }
    var inputBoxStyle = {border: '1px solid #e6e6e6', borderRadius: '2px', padding: '5px', color: '#555555', width: '50%'};
    var rowStyle = {margin: '10px'};
    var wellStyles = { maxWidth: 400, margin: '0 auto 10px' };

    function onChange(value) {
        captchaFlag = true;
    }

    return(
      <div>
        <div class="container" style={{"margin":"0px auto","width":"27.5%"}}>
          <div class="header" style={{"backgroundColor":"#2B3840","color":"white","padding":"12.5px","fontFamily":"Century Gothic","fontSize":"17.5px","fontWeight":"bold"}}>
            <div style={{"borderBottom":"3px solid white","paddingBottom":"10px","paddingTop":"25.5px"}}>
              LOGIN
            </div>
          </div>
          <div class="content" style={{"color":"white","backgroundColor":"#2B3840","textAlign":"left","padding":"40px","paddingTop":"35px","fontSize":"12.5px","fontWeight":"normal"}}>
            <FormGroup>
              <ControlLabel>USERNAME</ControlLabel>
              <div style={inputBox1Style}>
                <i class="fas fa-user" style={{"marginRight":"5px"}}></i>
                <input type="text" value={this.state.name} onFocus={() => this.setState({unSelect:"white"})} onBlur={() => this.setState({unSelect:"#696969"})} onChange={this.handleNameChange} style={{"width":"90%", "backgroundColor":"#2B3840","fontSize":"12.5px"}}/>
              </div>
            </FormGroup>
            <FormGroup>
              <ControlLabel>PASSWORD</ControlLabel>
              <div style={inputBox2Style}>
                <i class="fas fa-key" style={{"marginRight":"5px"}}></i>
                <input type="password" value={this.state.password} onFocus={() => this.setState({pwSelect:"white"})} onBlur={() => this.setState({pwSelect:"#696969"})} onChange={this.handlePasswordChange} style={{"width":"90%", "backgroundColor":"#2B3840","fontSize":"12.5px"}}/>
              </div>
            </FormGroup>
            <ReCAPTCHA
              ref={(el) => { captcha = el; }}
              sitekey="6Lfpfk8UAAAAAOjCO5h6-DctenztxMkeC8WLukEo"
              onChange={onChange}
            />
            <button onClick={this.handleSubmit} bsSize="large" style={submitButtonStyle}>SUBMIT</button>
            <div style={{"height":"70px"}}></div>
          </div>
          <div class="footer">
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
