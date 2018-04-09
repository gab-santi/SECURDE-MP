import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader, Button, FormGroup, FormControl, ControlLabel, ProgressBar} from 'react-bootstrap';

var Parse = require('parse');

class ForgotPw extends Component {
  constructor(){
    super();

    this.state={ email: ''};

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleEmailChange(event){
    this.setState({email:event.target.value});
  }
  handleSubmit(event){
    var Query = new Parse.Query(Parse.User);
    console.log("email: ", this.state.email);

    Query.equalTo('email',this.state.email);
    Query.find({useMasterKey: true}).then((result) => {
      if(result.length > 0){
        Parse.User.requestPasswordReset(this.state.email, {
          success: function() {
          // Password reset request was sent successfully
            alert("SENT");
          },
          error: function(error) {
            // Show the error message somewhere
            alert("Error: " + error.code + " " + error.message);
          }
        });
      } else { alert("User not found.") }
    }).catch(function(e){
      console.log(e);
    })

  }
  render(){
    var inputBox1Style = {border: '1px solid #e6e6e6', borderRadius: '2px', padding: '10px', width: '100%'};
    var submitButtonStyle = { float:"right",marginTop:"10px",backgroundColor:"#ffffff", border:"2px solid #2B3840",borderRadius:"3px", width:"100px",height:"3em", "fontFamily":"Century Gothic", "color":"#2B3840","fontWeight":"bold"};

    return(
      <div>
        <div class="container" style={{"margin":"0px auto","width":"27.5%"}}>
          <div class="header" style={{"backgroundColor":"white","boxShadow": "0 1px 2px rgba(0,0,0,.05),0 0 0 1px rgba(63,63,68,.1)","color":"#2B3840","padding":"12.5px","fontFamily":"Century Gothic","fontSize":"17.5px","fontWeight":"bold"}}>
            <div style={{"borderBottom":"3px solid #2B3840","paddingBottom":"10px","paddingTop":"25.5px"}}>
              Find Your Account
            </div>
          </div>
          <div class="content" style={{"color":"#2B3840","backgroundColor":"white","boxShadow": "0 1px 2px rgba(0,0,0,.05),0 0 0 1px rgba(63,63,68,.1)","textAlign":"left","padding":"40px","paddingTop":"35px","fontSize":"12.5px","fontWeight":"normal"}}>
            <FormGroup>
              <ControlLabel>Please enter your email to search for your account.</ControlLabel>
              <div style={inputBox1Style}>
                <i class="fas fa-user" style={{"marginRight":"5px"}}></i>
                <input type="email" value={this.state.email} onChange={this.handleEmailChange} style={{"width":"90%", "backgroundColor":"#ffffff","fontSize":"12.5px"}}/>
              </div>
            </FormGroup>
            <button onClick={this.handleSubmit} bsSize="large" style={submitButtonStyle}>SEARCH</button>
            <div style={{"height":"70px"}}></div>
          </div>
        </div>
      </div>
    )
  }
}
export default ForgotPw;
