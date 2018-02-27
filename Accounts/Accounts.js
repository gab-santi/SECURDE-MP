import React, { Component } from 'react';
import '../App.css';
import '../css/main.min.css';
import '../css/util.min.css';
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import { Table, Grid, Row, Col, PageHeader, Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Pagination from 'react-js-pagination';
import ModalView from '../ModalView/ModalView.js';

var Parse = require('parse');
const moment = require('moment');

class Accounts extends Component {
  constructor(){
    super();

    this.state = { accountList: [], displayList: [], activePage: 1, accountCount: 0,
                   modalType: '', account: '', showModal: false}

    this.getAccountList = this.getAccountList.bind(this);
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
    this.getAccountList();
    this.getDisplayList();
  }
  getAccountList(){
    var Query = new Parse.Query(Parse.User);

    Query.equalTo("admin",false);
    Query.find().then((list) => {
      this.setState({accountList: list, accountCount: list.length});
    })
  }
  getDisplayList(){
    var Query = new Parse.Query(Parse.User);

    Query.equalTo("admin",false);
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
  setItem(modalType, account){
    this.setState({modalType: modalType, account: account});
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
    return(
      <div style={{"margin":"0px auto","width":"70%"}}>
        <Grid>
          <Row>
            <Col md={2}>
              <Button style={{"margin":"15px"}} onClick={() => this.setModalType("create")}>Create</Button>
            </Col>
          </Row>
        </Grid>
        <Pagination activePage={this.state.activePage} itemsCountPerPage={10} totalItemsCount={this.state.accountCount} onChange={this.handlePageChange}/>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Joined on</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.state.displayList.map((item => {
              console.log("EMAIL", item.get('password'));
              return (
                <tr>
                  { typeof item.get('username') === 'undefined'
                    ? <td> --- </td>
                    : <td> { item.get('username') } </td> }
                  { typeof item.get('email') === 'undefined'
                    ? <td> --- </td>
                    : <td> { item.get('email') } </td> }
                  { typeof item.get('createdAt') === 'undefined'
                    ? <td> --- </td>
                    : <td> { moment(item.get('createdAt')).format("MM-DD-YYYY")} </td> }
                    <td>
                      <a href="#" onClick={() => this.setItem("view",item)}><i class="fas fa-eye f2ed" style={iconStyle}></i></a>
                      <a href="#" onClick={() => this.setItem("edit",item)}><i class="fas fa-edit" style={iconStyle}></i></a>
                      <a href="#" onClick={() => this.setItem("delete",item)}><i class="fas fa-trash-alt" style={iconStyle}></i></a>
                    </td>
                </tr>
              )
            }))
            }
          </tbody>
        </Table>
        <Pagination activePage={this.state.activePage} itemsCountPerPage={10} totalItemsCount={this.state.accountCount} onChange={this.handlePageChange}/>
        <ModalView style={{"margin-top":"300px"}} modalType={this.state.modalType} refresh={this.refreshList} close={this.closeModal}  account={this.state.account} show={this.state.showModal}/>
      </div>
    )
  }
}

export default Accounts;
