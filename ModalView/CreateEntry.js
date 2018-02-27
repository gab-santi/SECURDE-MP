import React, { Component } from 'react';
import {FormGroup, Grid, Col, Row, FormControl, ControlLabel, Button} from 'react-bootstrap';

var Parse = require('parse');

class CreateEntry extends Component {
  constructor(props){
    super(props);

    this.state = { name: '', password: '', email: ''}

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    if(typeof this.props.account !== 'undefined'){
        this.setState({name: this.props.account.get('username')/*, password: this.props.account.get('password'), email: this.props.account.get('email')*/});
    }
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

    if(typeof this.props.account !== 'undefined'){
      qry = this.props.account;
    }

    qry.set("username",this.state.name);
    if(typeof this.props.account === 'undefined'){
      qry.set("password",this.state.password);
      qry.set("email",this.state.email);
      qry.set("admin",false);
    }
    qry.save(null,{useMasterKey:true}).then(() => {
      console.log("Signup Success");
      this.props.refresh();
      this.props.close();
    }).catch(function(e){
      console.log(e);
    })
    this.setState({name: '',password: '', email: ''});
  }
  render(){
    var inputBoxStyle = {border: '1px solid #e6e6e6', borderRadius: '2px', padding: '5px', color: '#555555', width: '50%'};
    var rowStyle = { marginBottom: '15px' };
    return(
      <div>
        <Grid>
          <Row style={rowStyle}>
            <Col md={2}>
              Userame
            </Col>
            <Col md={10} style={inputBoxStyle}>
              <input type="text" style={{"width":"100%"}} value={this.state.name} onChange={this.handleNameChange}/>
            </Col>
          </Row>
          { typeof this.props.account === 'undefined' ?
            <Row style={rowStyle}>
              <Col md={2}>
                Password
              </Col>
              <Col md={10} style={inputBoxStyle}>
                <input type="text" style={{"width":"100%"}} value={this.state.password} onChange={this.handlePasswordChange}/>
              </Col>
            </Row> : ""
          }
          { typeof this.props.account === 'undefined' ?
          <Row style={rowStyle}>
            <Col md={2}>
              Email
            </Col>
            <Col md={10} style={inputBoxStyle}>
              <input type="text" style={{"width":"100%"}} value={this.state.email} onChange={this.handleEmailChange}/>
            </Col>
          </Row> : ""
          }
          <Col smOffset={10} sm={10}>
              <Button onClick={this.handleSubmit}>Add</Button>
          </Col>
        </Grid>
      </div>
    )
  }
}

export default CreateEntry;
