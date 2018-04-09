import React from 'react'

export class Validation extends React.Component {
    
  static validateTextInput(input) {
    input.trim();
    var blacklisted = ["''", ";", "!--", "<XSS>", "\"", "=", "&", "{", "}", "(", ")"];
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
  

  render() {
    return 
  }
}