import React, { Component } from 'react';
import '../App.css';
import { Grid, Row, Col, PageHeader, Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom'

var Parse = require('parse');

class Signup extends Component{
  constructor(props){
    super(props);
    this.state = {name: '',
                  password: '',
                  email: '',
                  loggedIn: ''};

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event){
    this.setState({name:event.target.value});
  }

  handlePasswordChange(event){
    this.setState({password:event.target.value});
  }

  handleEmailChange(event){
    this.setState({email:event.target.value});
  }

  handleSubmit(event){
    var Query = Parse.Object.extend(Parse.User);
    var qry = new Query();

    qry.set("username",this.state.name);
    qry.set("password",this.state.password);
    qry.set("email",this.state.email);

    qry.save().then(function(){
      console.log("Signup Success");
    }).catch(function(e){
      console.log("Signup Failed");
    })
    this.setState({name: '',password: '', email: ''});
  }

  render(){
    var inputBoxStyle = {border: '1px solid #e6e6e6', borderRadius: '2px', padding: '5px', color: '#555555', width: '50%'};
    var rowStyle = {margin: '10px'};
    var wellStyles = { maxWidth: 400, margin: '0 auto 10px' };
    return(
      <div>
        <Grid style={{"margin":"0px auto","width":"35%","font-size":"17.5px","padding":"10px"}}>
          <PageHeader>
            <Row style={{"text-align":"center"}}>
              <Col md={10}>Signup</Col>
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
          <Row style={rowStyle}>
            <Col md={3}>Email</Col>
            <Col md={7} style={inputBoxStyle}>
              <input type="email" value={this.state.email} onChange={this.handleEmailChange}/>
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

export default Signup;
