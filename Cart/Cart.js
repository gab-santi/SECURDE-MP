import React, { Component } from 'react';
import '../App.css';
import '../css/main.min.css';
import '../css/util.min.css';
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import { Grid, Row, Col, PageHeader, Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Item from '../Cart/Item.js';

var Parse = require('parse');

class Cart extends Component{
  constructor(props){
    super(props);
    this.state = {value: '', items: [], total: 0, defaultTotal: 0};

	this.getItems = this.getItems.bind(this);
	this.deleteItem = this.deleteItem.bind(this);
	this.purchaseItems = this.purchaseItems.bind(this);
	this.savePurchase = this.savePurchase.bind(this);
  this.totalChange = this.totalChange.bind(this);
  this.addDefaultTotal = this.addDefaultTotal.bind(this);
  this.changeQuantity = this.changeQuantity.bind(this);
  }

  componentDidMount(){
	  this.getItems();
  }
  addDefaultTotal(){
    //console.log("ITEM: ",item);
    var total=0;
    for(var i=0; i < this.state.items.length ;i++){
      total= total+(this.state.items[i].product.price*this.state.items[i].quantity);
    }
    //var total = this.state.defaultTotal + (item.product.price * item.quantity);
    this.setState({defaultTotal:total});
  }
  getItems(){
	  try{
		  var cart = [];
		  cart = JSON.parse(localStorage.getItem('cart'));

		  this.setState({items: []});
      var currentItems = this.state.items;
		  for(var i = 0; i < cart.length; i++){
  			var item = JSON.parse(cart[i].replace('/',''));

  			currentItems.push(item);
        if(i == cart.length-1){
    			this.setState({items: currentItems}, () => {
            this.addDefaultTotal();
          });
        }
		  }
	  }
	  catch(err){
		  console.log(err);
	  }
  }

  deleteItem(item){
	  try{
		  var currentItems = this.state.items;
		  var index = currentItems.indexOf(item);
		  this.setState({items: currentItems.splice(index,1)});

		  var cart = [];
		  cart = JSON.parse(localStorage.getItem('cart'));
		  cart.splice(index, 1);
		  localStorage.setItem('cart',JSON.stringify(cart));

		  this.setState({total: 0});
	  }
	  catch(err){
		  console.log(err);
	  }
  }

  purchaseItems(){
	  try{
		  var items = this.state.items;
		  for(var i = 0; i < items.length; i++){
				this.savePurchase(i);
		  }

		  alert("Purchase successful!");
	  }
	  catch(err){
		  console.log(err);
	  }
  }

  savePurchase(i){
	  var index = i;
	  var items = this.state.items;

	  var query = new Parse.Query('Product');

	  query.equalTo('id', items[index].product.id)
				.find({
					success: (results) => {
						var Query = Parse.Object.extend('Purchase');
						var p = new Query();

						console.log(items[index]);
						p.set('product', results[0]);
						p.set('user', Parse.User.current());
						p.set('quantity', items[index].quantity);

						p.save().then( () =>{
							this.deleteItem(items[index]);
						}).catch(e => {
						  console.log(e);
						});

					},
					error: function(error){
						console.log(error);
					}

				});
  }
  totalChange(change){
    console.log("change: ", change);
    console.log("change2: ",this.state.total+ change);
    var change2 = this.state.total+change;
    this.setState({total: change2});
  }
  changeQuantity(item, change,index){
    console.log("ITEM: ",item);
    console.log("CHANGE: ",change);
    var newQuantity = item.quantity + change;
    item.quantity = newQuantity;
    item.setState({quantity: newQuantity});
    localStorage.setItem('cart', JSON.stringify(this.state.items));
  }
  render(){
    return(

    <div>
    	<div style={{"width":"100%"}}>
		<section class="cart bgwhite p-t-70 p-b-100">
		<div class="container">

			<div class="container-table-cart pos-relative">
				<div class="wrap-table-shopping-cart bgwhite">
					<table class="table-shopping-cart">
						<tr class="table-head">
							<th class="column-1"></th>
							<th class="column-2">Product</th>
							<th class="column-3">Price</th>
							<th class="column-4 p-l-70">Quantity</th>
							<th class="column-5">Total</th>
						</tr>

						{

						this.state.items.map((item) => {
							//this.state.total += item.product.price * item.quantity;
              console.log(this.state.items.indexOf(item));
							return(
								<Item key={item.id} item={item} func={this.deleteItem} totalChange={this.totalChange} changeQuantity={this.changeQuantity} index={this.state.items.indexOf(item)}/>
						);
						})

						}

					</table>
				</div>
			</div>



        <div class="bo9 w-size18 p-l-40 p-r-40 p-t-30 p-b-38 m-t-30 m-r-0 m-l-auto p-lr-15-sm" style={{"margin-right":"20px"}}>
				<h5 class="m-text20 p-b-24">
					Cart Totals
				</h5>

				<div class="flex-w flex-sb-m p-t-26 p-b-30">
					<span class="m-text22 w-size19 w-full-sm">
						Total:
					</span>

					<span class="m-text21 w-size20 w-full-sm">
						${this.state.total + this.state.defaultTotal}
					</span>
				</div>

				<div class="size15 trans-0-4">

					<button class="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4" onClick={() => {this.purchaseItems()}}>
						Checkout
					</button>
				</div>
			</div>
      </div>
      </section>
      </div>
      </div>

    )
  }
}

export default Cart;
