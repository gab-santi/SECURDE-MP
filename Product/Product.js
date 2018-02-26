import React, { Component } from 'react';
import '../App.css';
import '../css/main.min.css';
import '../css/util.min.css';
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import { Grid, Row, Col, PageHeader, Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

var Parse = require('parse');
Parse.initialize("securdemp");

console.log("Session: " + Parse.Session.current());

class Product extends Component{
  constructor(props){
    super(props);

    this.state = { product: [], name: '', description: '', url: '', price: 0, quantity: 1}
    console.log(this.props.location.search.substr(1));

    this.getItem = this.getItem.bind(this);
    this.quantityChange = this.quantityChange.bind(this);
  }
  componentDidMount(){
    this.getItem();
  }
  getItem(){
    var Query = new Parse.Query("Product");
    var name = this.props.location.search.substr(1);
    console.log(name);
    name = name.split('%20').join(' ');
    console.log(name);
    Query.equalTo("name",name);
    Query.find().then((item) => {
      this.setState({product: item}, () => {
        console.log(this.state.product);
        this.setState({name: this.state.product[0].get('name'), description: this.state.product[0].get(),
        url: this.state.product[0].get('image').url(), price: this.state.product[0].get('price')});
      });
    })
  }
  quantityChange(change){
    var change = this.state.quantity+change;
    this.setState({quantity: change});
  }
  addToCart(){
    var item = this.getItem();
    console.log(item);
  }
  render(){
    return(
      <div>
        <Grid style={{"textAlign":"left"}}>
          <Row>
            <Col md={6}>
              <img src={this.state.url} style={{"width":"80%"}}/>
            </Col>
            <Col md={6}>
              <h4 class="product-detail-name m-text16 p-b-13">
                {this.state.name}
              </h4>
              <span class="m-text17">₱{this.state.price}</span>
              <h5 class="m-text19" style={{"margin-top":"10px"}}>Description</h5>
              <p class="s-text8">{this.state.description}</p>

              <div class="flex-r-m flex-w p-t-10">
    						<div class="w-size16 flex-m flex-w">
    							<div class="flex-w bo5 of-hidden m-r-22 m-t-10 m-b-10">
    								<button class="btn-num-product-down color1 flex-c-m size7 bg8 eff2" onClick={() => {this.quantityChange(-1)}}>
    									<i class="fs-12 fa fa-minus" aria-hidden="true"></i>
    								</button>

    								<input class="size8 m-text18 t-center num-product" name="num-product" value={this.state.quantity} type="number"/>

    								<button class="btn-num-product-up color1 flex-c-m size7 bg8 eff2" onClick={() => {this.quantityChange(1)}}>
    									<i class="fs-12 fa fa-plus" aria-hidden="true"></i>
    								</button>
    							</div>

    							<div class="btn-addcart-product-detail size9 trans-0-4 m-t-10 m-b-10">
    								<button class="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4" onClick={() => {this.addToCart()}}>
    									Add to Cart
    								</button>
    							</div>
    						</div>
    					</div>

            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Product;
