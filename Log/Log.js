import React, { Component } from 'react';
import '../App.css';
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import { Table, Grid, Row, Col, PageHeader, Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Pagination from 'react-js-pagination';

var Parse = require('parse');
const moment = require('moment');

class Log extends Component{
  constructor(){
    super();

    this.state = { logList: [], displayList: [], activePage: 1, logCount: 0, log: ''}

    this.getLogList = this.getLogList.bind(this);
    this.getDisplayList = this.getDisplayList.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.refreshList = this.refreshList.bind(this);
  }
  componentDidMount(){
    this.refreshList();
  }
  refreshList(){
    this.getLogList();
    this.getDisplayList();
  }
  getLogList(){
    var Query = new Parse.Query("Log");
      
    Query.find().then((list) => {
      this.setState({logList: list, logCount: list.length});
    })
  }
  getDisplayList(){
    var Query = new Parse.Query("Log");

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
  render(){
    return(
      <div style={{"margin":"0px auto","width":"90%"}}>
        <Pagination activePage={this.state.activePage} itemsCountPerPage={12} totalItemsCount={this.state.purchaseCount} onChange={this.handlePageChange}/>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>User</th>
              <th>Type</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            { this.state.displayList.map((item => {
              return (
                <tr>
                  { typeof item.get('updatedAt') === 'undefined'
                    ? <td> --- </td>
                    : <td> { moment(item.get('updatedAt')).format("MM/DD/YYYY HH:mm:ss Z") } </td> }
                  { typeof item.get('username') === 'undefined'
                    ? <td> --- </td>
                    : <td> { item.get('username') } </td> }
                  { typeof item.get('type') === 'undefined'
                    ? <td> --- </td>
                    : <td> { item.get('type') } </td> }
                  { typeof item.get('message') === 'undefined'
                    ? <td> --- </td>
                    : <td> { item.get('message') } </td> }
                </tr>
              )
            }))
            }
          </tbody>
        </Table>
        <Pagination activePage={this.state.activePage} itemsCountPerPage={12} totalItemsCount={this.state.purchaseCount} onChange={this.handlePageChange}/>

      </div>
    )
  }
}

export default Log;
