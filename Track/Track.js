import React, { Component } from 'react';
import '../App.css';
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import { Table, Grid, Row, Col, PageHeader, Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Pagination from 'react-js-pagination';
import ModalView from '../ModalView/ModalView.js';

var Parse = require('parse');
const moment = require('moment');

class Track extends Component{
  constructor(){
    super();

    this.state = { purchaseList: [], displayList: [], activePage: 1, purchaseCount: 0,
                   modalType: '', product: '', showModal: false}

    this.getPurchaseList = this.getPurchaseList.bind(this);
    this.getDisplayList = this.getDisplayList.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setModalType = this.setModalType.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount(){
    this.refreshList();
  }
  refreshList(){
    this.getPurchaseList();
    this.getDisplayList();
  }
  getPurchaseList(){
    var Query = new Parse.Query("Purchase");
    Query.include("user");
    Query.include("product");

    Query.find().then((list) => {
      this.setState({purchaseList: list, purchaseCount: list.length});
    })
  }
  getDisplayList(){
    var Query = new Parse.Query("Purchase");
    Query.include("user");
    Query.include("product");

    Query.limit(12);
    Query.skip(12*(this.state.activePage-1));
    Query.find({useMasterKey: true}).then((list) => {
      this.setState({displayList: list});
      console.log(list);
    })
  }
  handlePageChange(pageNumber){
    this.setState({activePage: pageNumber,displayList: []}, () => {
      this.getDisplayList();
    });
  }
  setItem(modalType, product){
    this.setState({modalType: modalType, product: product});
    this.showModal();
  }
  setModalType(modalType){
    this.setState({modalType: modalType});
    this.showModal();
  }
  showModal(){
    this.setState({showModal: true});
  }
  closeModal(){
    this.setState({showModal: false});
  }
  render(){
    var iconStyle = {margin:"5px", color:"black"}
    return(
      <div style={{"margin":"0px auto","width":"90%"}}>
        <Pagination activePage={this.state.activePage} itemsCountPerPage={10} totalItemsCount={this.state.productCount} onChange={this.handlePageChange}/>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>User</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            { this.state.displayList.map((item => {
              return (
                <tr>
                  { typeof item.get('createdAt') === 'undefined'
                    ? <td> --- </td>
                    : <td> { moment(item.get('createdAt')).format("MM-DD-YYYY") } </td> }
                  { typeof item.get('user') === 'undefined'
                    ? <td> --- </td>
                    : <td> { item.get('user').get('username') } </td> }
                  { typeof item.get('product') === 'undefined'
                    ? <td> --- </td>
                    : <td> { item.get('product').get('name') } </td> }
                  { typeof item.get('product') === 'undefined'
                    ? <td> --- </td>
                    : <td> { item.get('product').get('price') } </td> }
                  { typeof item.get('quantity') === 'undefined'
                    ? <td> --- </td>
                    : <td> { item.get('quantity') } </td> }
                  { typeof item.get('quantity') === 'undefined' || item.get('product') === 'undefined'
                    ? <td> --- </td>
                    : <td> { item.get('quantity') * item.get('product').get('price') } </td> }
                  <td>
                    <a href="#" onClick={() => this.setItem("cancelPurchase",item)}><i class="fas fa-eye f2ed" style={iconStyle}></i></a>
                  </td>
                </tr>
              )
            }))
            }
          </tbody>
        </Table>
        <Pagination activePage={this.state.activePage} itemsCountPerPage={10} totalItemsCount={this.state.productCount} onChange={this.handlePageChange}/>
        <ModalView modalType={this.state.modalType} refresh={this.refreshList} close={this.closeModal}  product={this.state.product} show={this.state.showModal}/>

      </div>
    )
  }
}

export default Track;
