import React, { Component } from 'react';
import '../App.css';
import { Grid, Row, Col, PageHeader, Button, FormGroup, FormControl, ControlLabel, ProgressBar} from 'react-bootstrap';
import { Redirect } from 'react-router-dom'

var Parse = require('parse');
var zxcvbn = require('zxcvbn');

class Signup extends Component{
  constructor(props){
    super(props);
    this.state = {name: '',
                  password: '',
                  email: '',
                  loggedIn: '',
                  unSelect: "#696969",pwSelect: "#696969",emSelect: "#696969",
                  pwStrength: '', pwColor: '', pwScore: 0, pwBar: ''};

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event){
    this.setState({name:event.target.value});
  }

  handlePasswordChange(event){
    this.setState({password:event.target.value}, () => {
      console.log(zxcvbn(this.state.password).score);
      var score = zxcvbn(this.state.password).score;

      if(this.state.password == ''){
        this.setState({pwStrength:"",pwColor:"black",pwScore:0, pwBar:"danger"});
      }
      else if(score==0){
        this.setState({pwStrength:"Worst",pwColor:"#D9534F",pwScore:20, pwBar:"danger"});
      }
      else if(score==1){
        this.setState({pwStrength:"Weak",pwColor:"#F0AD4E",pwScore:40, pwBar:"warning"});
      }
      else if(score==2){
        this.setState({pwStrength:"Bad",pwColor:"#FFFF99",pwScore:60, pwBar:"warning"});
      }
      else if(score==3){
        this.setState({pwStrength:"Good",pwColor:"#5BC0DE",pwScore:80, pwBar:"info"});
      }
      else if(score==4){
        this.setState({pwStrength:"Strong",pwColor:"#5CB85C",pwScore:95, pwBar:"success"});
      }
    });
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
    console.log("UNSELECT: ", this.state.unSelect);
    var inputBox1Style = {border: '1px solid #e6e6e6', borderRadius: '2px', padding: '10px', color: this.state.unSelect, width: '100%'};
    var inputBox2Style = {border: '1px solid #e6e6e6', borderRadius: '2px', padding: '10px', color: this.state.pwSelect, width: '100%'};
    var inputBox3Style = {border: '1px solid #e6e6e6', borderRadius: '2px', padding: '10px', color: this.state.emSelect, width: '100%'};
    var rowStyle = {margin: '10px'};
    var wellStyles = { maxWidth: 400, margin: '0 auto 10px' };
    var submitButtonStyle = { float:"right",marginTop:"10px",backgroundColor:"#E53535", border:"5px solid #E3313F",borderRadius:"3px", width:"100px",height:"3em", "fontFamily":"Century Gothic", "color":"white","fontWeight":"bold"};
    return(
      <div>
        <div class="container" style={{"margin":"0px auto","width":"27.5%"}}>
          <div class="header" style={{"backgroundColor":"#2B3840","color":"white","padding":"12.5px","fontFamily":"Century Gothic","fontSize":"17.5px","fontWeight":"bold"}}>
            <div style={{"borderBottom":"3px solid white","paddingBottom":"10px","paddingTop":"25.5px"}}>
              SIGN UP
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
              <ControlLabel>EMAIL</ControlLabel>
              <div style={inputBox3Style}>
                <i class="fas fa-envelope" style={{"marginRight":"5px"}}></i>
                <input type="email" value={this.state.email} onFocus={() => this.setState({emSelect:"white"})} onBlur={() => this.setState({emSelect:"#696969"})} onChange={this.handleEmailChange} style={{"width":"90%", "backgroundColor":"#2B3840","fontSize":"12.5px"}}/>
              </div>
            </FormGroup>
            <FormGroup>
              <ControlLabel>PASSWORD</ControlLabel>
              <div style={inputBox2Style}>
                <i class="fas fa-key" style={{"marginRight":"5px"}}></i>
                <input type="password" value={this.state.password} onFocus={() => this.setState({pwSelect:"white"})} onBlur={() => this.setState({pwSelect:"#696969"})} onChange={this.handlePasswordChange} style={{"width":"90%", "backgroundColor":"#2B3840","fontSize":"12.5px"}}/>
              </div>
            </FormGroup>
            <ControlLabel style={{"color":"#494949"}}>PASSWORD STRENGTH: <div style={{"display":"inline-block","color":this.state.pwColor}}>{this.state.pwStrength}</div></ControlLabel>
            <ProgressBar now={this.state.pwScore} bsStyle={this.state.pwBar} style={{"height":"10px"}}/>
            <button onClick={this.handleSubmit} bsSize="large" style={submitButtonStyle}>SIGN UP</button>
            <div style={{"height":"70px"}}></div>
          </div>
          <div class="footer">
          </div>
        </div>
      </div>
    )
  }
}

export default Signup;
