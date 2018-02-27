import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap'

const moment = require('moment');

class ViewProduct extends Component{
  constructor(props){
    super(props);

  }
  render() {
    return(
      <Table bordered hover>
        <tr>
          <th>Name</th>
          { typeof this.props.product.get('name') === 'undefined'
            ? <td> --- </td>
            : <td> { this.props.product.get('name') } </td>
          }
        </tr>
        <tr>
          <th>Category</th>
          { typeof this.props.product.get('category') === 'undefined'
            ? <td> --- </td>
            : <td> { this.props.product.get('category') } </td>
          }
        </tr>
        <tr>
          <th>Subcategory</th>
          { typeof this.props.product.get('subcategory') === 'undefined'
            ? <td> --- </td>
            : <td> { this.props.product.get('subcategory') } </td>
          }
        </tr>
        <tr>
          <th>Price</th>
          { typeof this.props.product.get('price') === 'undefined'
            ? <td> --- </td>
            : <td> { this.props.product.get('price') } </td>
          }
        </tr>
        <tr>
          <th>Stock</th>
          { typeof this.props.product.get('stock') === 'undefined'
            ? <td> --- </td>
            : <td> { this.props.product.get('stock') } </td>
          }
        </tr>
        <tr>
          <th>Image</th>
          { typeof this.props.product.get('image') === 'undefined'
            ? <td> --- </td>
            : <td> <img style={{"width":"35%"}} src={ this.props.product.get('image').url() }/> </td>
          }
        </tr>
        <tr>
          <th>Description</th>
          { typeof this.props.product.get('description') === 'undefined'
            ? <td> --- </td>
            : <td> { this.props.product.get('description') } </td>
          }
        </tr>
      </Table>
    )
  }
}
export default ViewProduct;
