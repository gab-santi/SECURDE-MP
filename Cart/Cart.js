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

class Cart extends Component{
  constructor(props){
    super(props);
    this.state = {value: '', items: []};
	
	this.getItems = this.getItems.bind(this);
	this.deleteItem = this.deleteItem.bind(this);
	this.updateTotals = this.updateTotals.bind(this);
	this.updateCart = this.updateTotals.bind(this);
	this.purchaseItems = this.purchaseItems.bind(this);
	this.savePurchase = this.savePurchase.bind(this);
  }
  
  componentDidMount(){
	  this.getItems();
  }
  
  getItems(){
	  try{
		  var cart = [];
		  cart = JSON.parse(localStorage.getItem('cart'));
		  
		  this.setState({items: []});
		  for(var i = 0; i < cart.length; i++){
			var item = JSON.parse(cart[i].replace('/',''));
			var currentItems = this.state.items;
			currentItems.push(item);
			this.setState({items: currentItems});
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

  updateTotals(){
	  
  }
  
  updateCart(){
	  
  }

  render(){
    return(
    
    <div>
    	<div style={{"width":"100%"}}>
		{ 
		
		this.state.items.map((item) => {
			return(
				<p>{item.product.name}</p>	
			);
		})

		}
		
		</div>
		

        <div class="bo9 w-size18 p-l-40 p-r-40 p-t-30 p-b-38 m-t-30 m-r-0 m-l-auto p-lr-15-sm" style={{"margin-right":"20px"}}>
				<h5 class="m-text20 p-b-24">
					Cart Totals
				</h5>
				<div class="flex-w flex-sb-m p-b-12">
					<span class="s-text18 w-size19 w-full-sm">
						Subtotal:
					</span>

					<span class="m-text21 w-size20 w-full-sm">
						$39.00
					</span>
				</div>

				<div class="flex-w flex-sb bo10 p-t-15 p-b-20">
					<span class="s-text18 w-size19 w-full-sm">
						Shipping:
					</span>

					<div class="w-size20 w-full-sm">
						<p class="s-text8 p-b-23">
							There are no shipping methods available. Please double check your address, or contact us if you need any help.
						</p>

						<span class="s-text19">
							Calculate Shipping
						</span>

						<div class="size13 bo4 m-b-12">
						<input class="sizefull s-text7 p-l-15 p-r-15" name="state" placeholder="State /  country" type="text"/>
						</div>

						<div class="size13 bo4 m-b-22">
							<input class="sizefull s-text7 p-l-15 p-r-15" name="postcode" placeholder="Postcode / Zip" type="text"/>
						</div>

						<div class="size14 trans-0-4 m-b-10">

							<button class="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4">
								Update Totals
							</button>
						</div>
					</div>
				</div>

				<div class="flex-w flex-sb-m p-t-26 p-b-30">
					<span class="m-text22 w-size19 w-full-sm">
						Total:
					</span>

					<span class="m-text21 w-size20 w-full-sm">
						$39.00
					</span>
				</div>

				<div class="size15 trans-0-4">

					<button class="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4" onClick={() => {this.purchaseItems()}}>
						Checkout
					</button>
				</div>
			</div>
      </div>
    )
  }
}

export default Cart;
