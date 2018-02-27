import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class DeleteEntry extends Component {
  constructor(props){
    super(props);
    this.state = {account: this.props.account, product: this.props.product}
    this.deleteEntry = this.deleteEntry.bind(this);
    console.log("checkkkk");
  }
  deleteEntry(){
    if(this.props.modalType == "delete"){
      var qry = this.props.account;
    }
    else{
      var qry = this.props.product;
    }
    qry.destroy({useMasterKey : true}).then(() => {
      console.log("success");
      this.props.refresh();
      this.props.close();
    }).catch(function(e){
      console.log(e);
    })
  }
  render(){
    return(
      <body>
      "Would you like to delete this entry?"
      <Button onClick={this.deleteEntry}>Delete</Button>
      </body>
    )
  }
}

export default DeleteEntry;
