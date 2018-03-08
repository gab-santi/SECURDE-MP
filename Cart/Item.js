import React, { Component } from 'react';
import '../App.css';
import '../css/main.min.css';
import '../css/util.min.css';
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import { Grid, Row, Col, PageHeader, Button} from 'react-bootstrap';
import { Switch, Route, Link , Redirect} from "react-router-dom";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Parse from 'parse';
import Product from '../Product/Product.js';
class Item extends Component {
	constructor(props){
		super(props);

		this.state = { product: props.item, quantity: props.item.quantity}
		console.log(this.state.quantity);
	}
	componentDidMount(){

	}
	quantityChange(change){
    	var change2 = this.state.quantity+change;
    	this.setState({quantity: change2});
			this.props.totalChange(change*this.props.item.product.price);
			//this.props.changeQuantity(this,change,this.props.index);
  	}
  	deleteItem() {
  		this.props.func(this.props.item);
  	}
	render() {
		return(
			<tr class="table-row">
							<td class="column-1">
								<div class="cart-img-product b-rad-4 o-f-hidden" onClick={() => {this.deleteItem()}}>
								X
								</div>
							</td>
							<td class="column-2">{this.props.item.product.name}</td>
							<td class="column-3">${this.props.item.product.price}</td>
							<td class="column-4">
								<div class="flex-w bo5 of-hidden w-size17">
									<button class="btn-num-product-down color1 flex-c-m size7 bg8 eff2" onClick={() => {this.quantityChange(-1)}}>
										<i class="fs-12 fa fa-minus" aria-hidden="true"></i>
									</button>

									<input class="size8 m-text18 t-center num-product" type="number" name="num-product1" value={this.state.quantity}></input>

									<button class="btn-num-product-up color1 flex-c-m size7 bg8 eff2" onClick={() => {this.quantityChange(1)}}>
										<i class="fs-12 fa fa-plus" aria-hidden="true"></i>
									</button>
								</div>
							</td>
							<td class="column-5">${this.props.item.product.price * (this.state.quantity)}</td>
			</tr>
		)
	}
}

export default Item;
