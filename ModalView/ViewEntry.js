import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap'

const moment = require('moment');

class ViewEntry extends Component{
  constructor(props){
    super(props);

  }
  render() {
    return(
      <Table bordered hover>
        <tr>
          <th>Name</th>
          { typeof this.props.account.get('username') === 'undefined'
            ? <td> --- </td>
            : <td> { this.props.account.get('username') } </td>
          }
        </tr>
        <tr>
          <th>Email</th>
          { typeof this.props.account.get('email') === 'undefined'
            ? <td> --- </td>
            : <td> { this.props.account.get('email') } </td>
          }
        </tr>
        <tr>
          <th>Join Date</th>
          { typeof this.props.account.get('createdAt') === 'undefined'
            ? <td> --- </td>
            : <td> { moment(this.props.account.get('updatedAt')).format("DD-MM-YYYY") } </td>
          }
        </tr>
      </Table>
    )
  }
}
export default ViewEntry;
