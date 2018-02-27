import React, { Component } from 'react';
import '../App.css';
import { PageHeader } from 'react-bootstrap';
import Item from '../Home/Item.js';

var Parse = require('parse');

class Home extends Component {
  constructor(){
    super();

    this.state = {allProducts: [], displayProducts: []}
  }
  componentDidMount(){
    this.getAllProducts();
    this.getDisplayList();
  }
  getAllProducts(){
    var Query = new Parse.Query("Product");

    Query.find().then((list) => {
      this.setState({allProducts: list, productCount: list.length});
    })
  }
  getDisplayList(){
    var Query = new Parse.Query("Product");

    Query.limit(8);
    //Query.skip(12*(this.state.activePage-1));
    Query.find().then((list) => {
      this.setState({displayProducts: list});
    })
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

    Query.limit(8);
    //Query.skip(12*(this.state.activePage-1));
    Query.equalTo("category",this.state.category);
    Query.find().then((list) => {
      this.setState({displayProducts: list});
    })
  }
  render(){
    return(
      <div>
        <PageHeader>
          Our Products
          <div class="wrap_menu">
            <nav class="menu">
            <ul class="main_menu">
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
            </nav>
          </div>
        </PageHeader>
        <div style={{"margin":"0px auto","width":"80%"}}>
        { this.state.displayProducts.map((item) => {
          console.log("Item: ", item);
          return(
            <Item key={item.id} item={item} style={{"display":"inline","width":"10%"}}/>
          )
        })
        }
        </div>
      </div>
    )
  }
}

export default Home;
