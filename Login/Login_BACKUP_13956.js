import React, { Component } from 'react';
import '../App.css';
import { Grid, Row, Col, PageHeader, Button, FormGroup, FormControl, ControlLabel, ProgressBar} from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import { withCookies, Cookies } from 'react-cookie';

var Parse = require('parse');
const moment = require('moment');

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
    var usernameTemp = this.state.name;
    var passwordTemp = this.state.password;

<<<<<<< HEAD
    if (captchaFlag) {
        Parse.User.logIn(this.state.name,this.state.password).then(() => {
            console.log("Login Success");
            this.setState({loggedIn: true});

	       this.cookies.set('cart', []);
	       /* var cart = [];
	       localStorage.setItem("cart", JSON.stringify(cart)); */

=======
    //check if account should be locked
    var QueryCheck = new Parse.Query("Log");
    QueryCheck.limit(5);
    QueryCheck.equalTo("username", usernameTemp);
    QueryCheck.equalTo("type", "Login Failure");
    QueryCheck.greaterThan("updatedAt", moment().subtract(15, 'minutes').toDate());
    QueryCheck.find().then((list) => {
        
        if (list.length < 5) { //account is not locked out
            
            Parse.User.logIn(usernameTemp, passwordTemp).then(() => { //attempt login
                console.log("Login Success");
                this.setState({loggedIn: true});
	            this.cookies.set('cart', []);
        
                //log login success
                var QueryLog = Parse.Object.extend("Log");
                var qryLog = new QueryLog();

                qryLog.set('type', "Login Success");
                qryLog.set('username', usernameTemp);
                qryLog.set('message', "user[" + usernameTemp + "] successfully logged in.");

                qryLog.save().then( () =>{
        
                }).catch(e => {
                    console.log(e);
                });
	  
>>>>>>> 6646f96eba3157c6edc5597ec976004ba307069f
            }).catch(function(e){
                console.log("Login Failed");
        
                //log login failure
                var QueryLog = Parse.Object.extend("Log");
                var qryLog = new QueryLog();
        
                qryLog.set('type', "Login Failure");
                //log username if it exists in order to accomodate account locking, else log undefined
                var QueryExists = new Parse.Query("_User");
                QueryExists.equalTo("username", usernameTemp);
                QueryExists.first({
                    success: function(object) {
                        if (object != undefined) {
                            qryLog.set('username', usernameTemp);
                        }
                    }, error: function(e) {
                        console.log(e);
                    }
                });
                setTimeout(function() {
                    qryLog.set('message', "Attempted login with username[" + usernameTemp +
                               "] and password[" + passwordTemp + "] resulting in failure.");

                    qryLog.save().then( () =>{

                    }).catch(e => {
                        console.log(e);
                    });
                }, 1000);

                document.getElementById("failPrompt").innerHTML = "Invalid Username or Password, please try again.";
                document.getElementById("failPrompt").style.visibility="visible";
            })
            
        } else { //lockout account
            
            //log account lockout
            var QueryLog = Parse.Object.extend("Log");
            var qryLog = new QueryLog();

            qryLog.set('type', "Account Lockout");
            qryLog.set('username', usernameTemp);
            qryLog.set('message', "Attempted login to locked account user[" + usernameTemp + 
                        "resulting in failure and lockout extension.");

            qryLog.save().then( () =>{
        
            }).catch(e => {
                console.log(e);
            });
            
            document.getElementById("failPrompt").innerHTML = "You have made too many failed login attempts, please try again in 15 minutes.";
            document.getElementById("failPrompt").style.visibility="visible";
        }
    });
                           
    this.setState({name: '',password: ''});
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
<<<<<<< HEAD

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
=======
    var failStyle = {visibility: 'hidden', color: '#ff0000'};
    return(
      <div>
        <Grid style={{"margin":"0px auto","width":"35%","font-size":"17.5px","padding":"10px"}}>
          <PageHeader>
            <Row style={{"text-align":"center"}}>
              <Col md={10}>Login</Col>
            </Row>
          </PageHeader>
          <Row style={rowStyle}>
            <Col md={3}>Username</Col>
            <Col md={7} style={inputBoxStyle}>
              <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
            </Col>
          </Row>
          <Row style={rowStyle}>
            <Col md={3}>Password</Col>
            <Col md={7} style={inputBoxStyle}>
              <input type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
            </Col>
          </Row>
          <Row>
            <Col md={10}>
              <Button onClick={this.handleSubmit} bsSize="large" block>SUBMIT</Button>
            </Col>
          </Row>
          <Row id='failPrompt' style={failStyle}>
            <Col md={10}>lorem ipsum</Col>
          </Row>
        </Grid>
>>>>>>> 6646f96eba3157c6edc5597ec976004ba307069f
      </div>
    )
  }
}

export default Login;
