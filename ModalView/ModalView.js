import React, { Component } from 'react';
import '../App.css';
import '../css/main.min.css';
import '../css/util.min.css';
import { Modal, Button } from 'react-bootstrap';
import { Route } from "react-router-dom";
import ViewEntry from '../ModalView/ViewEntry.js';
import CreateEntry from '../ModalView/CreateEntry.js';
import DeleteEntry from '../ModalView/DeleteEntry.js';
import ViewProduct from '../ModalView/ViewProduct.js';
import CreateProduct from '../ModalView/CreateProduct.js';

class ModalView extends Component {
  constructor(props,context){
    super(props,context);

    this.state = {
      show: false
    };
  }

  render(){
    return(
      <div style={{"margin-top":"2000px"}}>
        <Modal className="model-dialog" show={this.props.show} onHide={this.props.close} style={{"height":"2000px"}}>
          <Modal.Header style={{"margin-top":"20px"}}>
            <Modal.Title>
              {
                this.props.modalType == "view" || this.props.modalType == "viewProduct"
                ? "View"
                : this.props.modalType == "create" || this.props.modalType == "createProduct"
                ? "Create"
                : this.props.modalType == "edit"
                ? "Edit"
                : this.props.modalType == "delete"
                ? "Delete"
                : ""
              }

            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {
            this.props.modalType == "view"
            ? <ViewEntry modalType={this.props.modalType} account={this.props.account}/>
            : this.props.modalType == "create"
            ? <CreateEntry modalType={this.props.modalType} refresh={this.props.refresh} close={this.props.close}/>
            : this.props.modalType == "edit"
            ? <CreateEntry modalType={this.props.modalType} refresh={this.props.refresh} close={this.props.close} account={this.props.account}/>
            : this.props.modalType == "delete" || this.props.modalType == "deleteProduct"
            ? <DeleteEntry modalType={this.props.modalType} refresh={this.props.refresh} close={this.props.close} account={this.props.account} product={this.props.product}/>
            : this.props.modalType == "viewProduct"
            ? <ViewProduct modalType={this.props.modalType} product={this.props.product}/>
            : this.props.modalType == "createProduct"
            ? <CreateProduct modalType={this.props.modalType} refresh={this.props.refresh} close={this.props.close}/>
            : this.props.modalType == "editProduct"
            ? <CreateProduct modalType={this.props.modalType} refresh={this.props.refresh} close={this.props.close} product={this.props.product}/>
            : ""
          }
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
export default ModalView;
