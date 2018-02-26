import React, { Component } from 'react';
import '../App.css';
import '../css/main.min.css';
import '../css/util.min.css';
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import { Grid, Row, Col, PageHeader, Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Item from '../Shop/Item.js';
import Pagination from 'react-js-pagination';

var Parse = require('parse');

class Shop extends Component{
  constructor(props){
    super(props);
    this.state = {
                  //sorts
                  category: 'all', sort1:'',sort1Options: '', sort2:'',sort2Options:[],
                  //products
                  allProducts: [], displayProducts: [],
                  //pagination
                  activePage:1, productCount: 0}

    this.handleSort1Change = this.handleSort1Change.bind(this);
    this.handleSort2Change = this.handleSort2Change.bind(this);
    this.getAllProducts = this.getAllProducts.bind(this);
    this.getDisplayList = this.getDisplayList.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.handleCategoryFilter = this.handleCategoryFilter.bind(this);
    this.handleCategoryFilterDisplay = this.handleCategoryFilterDisplay.bind(this);
  }
  componentDidMount(){
    this.setState({sort1Options:[{label:"Default Sorting", value:1}, {label:"Popularity", value:2},
        {label:"Price: low to high", value:3}, {label:"Price: high to low", value:4}],
      sort2Options:[{label:"Price",value:1},{label:"$0.00 - $50.00",value:2},{label:"$50.00 - $100.00",value:3}
        ,{label:"$100.00 - $150.00",value:4},{label:"$150.00 - $200.00",value:5},{label:"$200.00+",value:6}]});
    this.getAllProducts();
    this.getDisplayList();
  }
  handleSort1Change (value) {
		this.setState({sort1: value});
  }
  handleSort2Change(value){
    this.setState({sort2:value});
  }
  getAllProducts(){
    var Query = new Parse.Query("Product");

    Query.find().then((list) => {
      this.setState({allProducts: list, productCount: list.length});
    })
  }
  getDisplayList(){
    var Query = new Parse.Query("Product");

    Query.limit(12);
    Query.skip(12*(this.state.activePage-1));
    Query.find().then((list) => {
      this.setState({displayProducts: list});
    })
  }
  handlePageChange(pageNumber){
    this.setState({activePage: pageNumber}, () => {
      if(this.state.category == "all"){
        this.getAllProducts();
        this.getDisplayList();
      }
      else{
        this.handleCategoryFilter();
        this.handleCategoryFilterDisplay();
      }
    });
  }
  changeCategory(cat){
    this.setState({category: cat, activePage: 1}, () => {
      if(cat == "all"){
        this.getAllProducts();
        this.getDisplayList();
        console.log("CATEGORY: ",cat);
      }
      else{
        this.handleCategoryFilter();
        this.handleCategoryFilterDisplay();
      }
    });
  }
  handleCategoryFilter(){
    console.log(this.state.category);
    var Query = new Parse.Query("Product");
    Query.equalTo("category",this.state.category);
    Query.find().then((list) => {
      this.setState({allProducts: list, productCount: list.length});
    })
  }
  handleCategoryFilterDisplay(){
    console.log(this.state.category);
    var Query = new Parse.Query("Product");

    Query.limit(12);
    Query.skip(12*(this.state.activePage-1));
    Query.equalTo("category",this.state.category);
    Query.find().then((list) => {
      this.setState({displayProducts: list});
    })
  }
  render(){
    var sortOptions = [{label:"Default Sorting", value:"1"}, {label:"Popularity", value:"2"},
      {label:"Price: low to high", value:"3"}, {label:"Price: high to low", value:"4"}];
    return(
      <div style={{"font-family": "Montserrat-Regular, sans-serif","font-weight":"400","font-size":"1.5rem","text-align":"left"}}>
        <Grid>
          <Row>
            <Col md={2}>
              <h4 style={{"font-weight":"bold","margin-bottom":"0.5rem"}}>Categories</h4>
              <ul class="p-b-54">
                <li class="p-t-4">
                  { this.state.category == "all"
                    ? <a class="s-text13 active1" href="#" onClick={() => {this.changeCategory("all")}}>All</a>
                    : <a class="s-text13" href="#" onClick={() => {this.changeCategory("all")}}>All</a>
                  }
                </li>
                <li class="p-t-4">
                  { this.state.category == "guitar"
                    ? <a class="s-text13 active1" href="#" onClick={() => {this.changeCategory("guitar")}}>Guitars</a>
                    : <a class="s-text13" href="#" onClick={() => {this.changeCategory("guitar")}}>Guitars</a>
                  }
                </li>
                <li class="p-t-4">
                { this.state.category == "piano"
                  ? <a class="s-text13 active1" href="#" onClick={() => {this.changeCategory("piano")}}>Pianos</a>
                  : <a class="s-text13" href="#" onClick={() => {this.changeCategory("piano")}}>Pianos</a>
                }
                </li>
                <li class="p-t-4">
                { this.state.category == "ukulele"
                  ? <a class="s-text13 active1" href="#" onClick={() => {this.changeCategory("ukulele")}}>Ukuleles</a>
                  : <a class="s-text13" href="#" onClick={() => {this.changeCategory("ukulele")}}>Ukuleles</a>
                }
                </li>
              </ul>
              <div class="search-product pos-relative bo4 of-hidden">
  							<input class="s-text7 size6 p-l-23 p-r-50" name="search-product" placeholder="Search Products..." type="text"/>

  							<button class="flex-c-m size5 ab-r-m color2 color0-hov trans-0-4">
  								<i class="fs-12 fa fa-search" aria-hidden="true"></i>
  							</button>
						  </div>
            </Col>
            <Col md={10}>
              <div class="flex-sb-m flex-w p-b-35">
                <div class="flex-w">
                  <div class="rs2-select2 bo4 w-size12 m-t-5 m-b-5 m-r-10">
                    <Select placeholder="Sort1" options={this.state.sort1Options} value={this.state.sort1} onChange={this.handleSort1Change}/>
                  </div>
                  <div class="rs2-select2 bo4 w-size12 m-t-5 m-b-5 m-r-10">
                    <Select placeholder="Sort2" options={this.state.sort2Options} value={this.state.sort2} onChange={this.handleSort2Change}/>
                  </div>
                </div>

                <span class="s-text8 p-t-5 p-b-5">
                  Showing {((this.state.activePage-1)*12)+1} - {this.state.activePage*12} of {this.state.productCount} results
                </span>
              </div>
              <Pagination activePage={this.state.activePage} itemsCountPerPage={12} totalItemsCount={this.state.productCount} onChange={this.handlePageChange}/>
              <div style={{"width":"100%"}}>
              {this.state.displayProducts.map((item) => {
                console.log("Item: ", item);
                return(
                  <Item key={item.id} item={item} style={{"display":"inline","width":"30%"}}/>
                )
              })

              }
              </div>
              <Pagination activePage={this.state.activePage} itemsCountPerPage={12} totalItemsCount={this.state.productCount} onChange={this.handlePageChange}/>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Shop;
