import React, { Component } from 'react';
import '../App.css';
import '../css/main.min.css';
import '../css/util.min.css';
import { Grid, Row, Col, PageHeader, Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom'

class Shop extends Component{
  constructor(props){
    super(props);
    this.state = {value: ''}
  }
  render(){
    return(
      <div style={{"font-family": "Montserrat-Regular, sans-serif","font-weight":"400","font-size":"1.5rem","text-align":"left"}}>
        <Grid>
          <Row>
            <Col md={2}>
              <h4 style={{"font-weight":"bold","margin-bottom":"0.5rem"}}>Categories</h4>
              <ul class="p-b-54">
                <li class="p-t-4">All</li>
                <li class="p-t-4">Guitars</li>
                <li>Pianos</li>
                <li>Others</li>
                <li>Others</li>
              </ul>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Shop;
