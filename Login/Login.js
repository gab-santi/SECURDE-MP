import React, { Component } from 'react';
import '../App.css';
import { Grid, Row, Col, PageHeader, Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import { withCookies, Cookies } from 'react-cookie';

var Parse = require('parse');

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

    Parse.User.logIn(this.state.name,this.state.password).then(() => {
      console.log("Login Success");
      this.setState({loggedIn: true});
	  
	  this.cookies.set('cart', []);
	  /* var cart = [];
	  localStorage.setItem("cart", JSON.stringify(cart)); */
	  
    }).catch(function(e){
      console.log("Login Failed");
    })
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
        </Grid>
      </div>
    )
  }
}

export default Login;
