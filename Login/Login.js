import React, { Component } from 'react';
import '../App.css';
import { Grid, Row, Col, PageHeader, Button} from 'react-bootstrap';
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

    //check if account should be locked
    var QueryCheck = new Parse.Query("Log");
    QueryCheck.limit(5);
    QueryCheck.equalTo("username", usernameTemp);
    QueryCheck.greaterThan("updatedAt", moment().subtract(15, 'minutes').toDate());
    QueryCheck.find().then((list) => {
        
        if (list.length < 5) { //account is not locked out
            
            Parse.User.logIn(this.state.name,this.state.password).then(() => { //attempt login
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
                }, 500);

                document.getElementById("failPrompt").innerHTML = "Invalid Username or Password, please try again.";
                document.getElementById("failPrompt").style.visibility="visible";
            })
            
        } else { //lockout account
            document.getElementById("failPrompt").innerHTML = "You have made too many login attempts, please try again in 15 minutes.";
            document.getElementById("failPrompt").style.visibility="visible";
        }
    });
                           
    this.setState({name: '',password: ''});
  }

  render(){
    if(this.state.loggedIn){
      return(
        <Redirect to="/"/>
      )
    }
    var inputBoxStyle = {border: '1px solid #e6e6e6', borderRadius: '2px', padding: '5px', color: '#555555', width: '50%'};
    var rowStyle = {margin: '10px'};
    var wellStyles = { maxWidth: 400, margin: '0 auto 10px' };
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
      </div>
    )
  }
}

export default Login;
