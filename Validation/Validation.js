import React from 'react'

export class Validation extends React.Component {
    
  static validateTextInput(input) {
    input.trim();
    var blacklisted = ["''", ";", "!--", "<XSS>", "\"", "=", "&", "{", "}", "(", ")", "<", ">", "_"];
	var xss_check = false;
	
	for (var i = 0; i < blacklisted.length; i++){
	  if(input.includes(blacklisted[i])){
	    xss_check = true;
		break;
	  }
	}
		
	console.log('XSS Check: ' + xss_check);
    return xss_check;
  }

  static validateTextInputWhitelist(input) {
  	input.trim();
  	var regex=  /[^a-z\d\-]/ig;

  	console.log('XSS Check: ' + regex.test(input));
  	return regex.test(input);
  }

  static validateTextInputWhitelistEmail(input) {
  	input.trim();
  	var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  	console.log('Invalid Email: ' + !((regex.test(input))));
  	return (!(regex.test(input)));
  }  
  
  static validateTextInputWhitelistSearch(input) {
  	input.trim();
  	var regex=  /[^a-z\d\-\s]+$/i;

  	console.log('Invalid Search: ' + regex.test(input));
  	alert("Invalid input, please try again.")
  	return regex.test(input);
  }

  render() {
    return 
  }
}