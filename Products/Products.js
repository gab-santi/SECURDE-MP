import React, { Component } from 'react';
import '../App.css';
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import { Table, Grid, Row, Col, Button} from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import Pagination from 'react-js-pagination';
import ModalView from '../ModalView/ModalView.js';
import { Link } from "react-router-dom";

var Parse = require('parse');

class Products extends Component {
  constructor(){
    super();

    this.state = { productList: [], displayList: [], activePage: 1, productCount: 0,
                   modalType: '', product: '', showModal: false}

    this.getProductList = this.getProductList.bind(this);
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
    this.getProductList();
    this.getDisplayList();
  }
  getProductList(){
    var Query = new Parse.Query("Product");

    Query.find().then((list) => {
      this.setState({productList: list, productCount: list.length});
    })
  }
  getDisplayList(){
    var Query = new Parse.Query("Product");

    Query.limit(12);
    Query.skip(12*(this.state.activePage-1));
    Query.find({useMasterKey: true}).then((list) => {
      this.setState({displayList: list});
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
    console.log("WORK")
  }
  render(){
    var iconStyle = {margin:"5px", color:"black"}
    if (Parse.User.current() == null || Parse.User.current().get('admin') == false) {
        return(
            <div>
                <div> Sorry, you must be an Administrator in order to access this page. </div>
                <a href="#">
                    <Link to="/">Back to Home</Link>
                </a>
            </div>
        )
    } else {
    return(
      <div style={{"margin":"0px auto","width":"90%"}}>
        <Grid>
          <Row>
            <Col md={2}>
              <Button style={{"margin":"15px"}} onClick={() => this.setModalType("createProduct")}>Create</Button>
            </Col>
          </Row>
        </Grid>
        <Pagination activePage={this.state.activePage} itemsCountPerPage={10} totalItemsCount={this.state.productCount} onChange={this.handlePageChange}/>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Image</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.state.displayList.map((item => {
              return (
                <tr>
                  { typeof item.get('name') === 'undefined'
                    ? <td> --- </td>
                    : <td> { item.get('name') } </td> }
                  { typeof item.get('category') === 'undefined'
                    ? <td> --- </td>
                    : <td> { item.get('category') } </td> }
                    { typeof item.get('subcategory') === 'undefined'
                      ? <td> --- </td>
                      : <td> { item.get('subcategory') } </td> }
                    { typeof item.get('price') === 'undefined'
                      ? <td> --- </td>
                      : <td> { item.get('price') } </td> }
                    { typeof item.get('stock') === 'undefined'
                      ? <td> --- </td>
                      : <td> { item.get('stock') } </td> }
                    { typeof item.get('image') === 'undefined'
                      ? <td> --- </td>
                      : <td> <img style={{"width":"40%"}} src={ item.get('image').url() }/> </td> }
                    { typeof item.get('description') === 'undefined'
                      ? <td> --- </td>
                      : <td> { item.get('description') } </td> }
                    <td>
                      <a href="#" onClick={() => this.setItem("viewProduct",item)}><i class="fas fa-eye f2ed" style={iconStyle}></i></a>
                      <a href="#" onClick={() => this.setItem("editProduct",item)}><i class="fas fa-edit" style={iconStyle}></i></a>
                      <a href="#" onClick={() => this.setItem("deleteProduct",item)}><i class="fas fa-trash-alt" style={iconStyle}></i></a>
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
}

export default Products;
