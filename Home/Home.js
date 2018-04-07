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
        { Parse.User.current() != null ? (
                <PageHeader>Welcome Back, {Parse.User.current().get('username')}!</PageHeader>
            ) : ( <PageHeader>Welcome to Stringify!</PageHeader> )
        }
        <PageHeader>Browse Our Products:</PageHeader>
        <div class="categories">
            <a class="category" href="#" onClick={() => {this.changeCategory("guitar")}}>
                <span style={{"display":"inline-block", "width":"30%", "margin":"0px auto"}}>
                    <img src={require('../images/guitar.png')}/>
                    <div style={{"margin":"7.5px"}}>
                        <span class="s-text13">Guitars</span>
                    </div>
                </span>
            </a>
            <a class="category" href="#" onClick={() => {this.changeCategory("piano")}}>
                <span style={{"display":"inline-block", "width":"30%", "margin":"0px auto"}}>
                    <img src={require('../images/piano.png')}/>
                    <div style={{"margin":"7.5px"}}>
                        <span class="s-text13">Pianos</span>
                    </div>
                </span>
            </a>
            <a class="category" href="#" onClick={() => {this.changeCategory("ukulele")}}>
                <span style={{"display":"inline-block", "width":"30%", "margin":"0px auto"}}>
                    <img src={require('../images/ukulele.png')}/>
                    <div style={{"margin":"7.5px"}}>
                        <span class="s-text13">Ukuleles</span>
                    </div>
                </span>
            </a>
        </div>
        <PageHeader>
            { this.state.category == "all"
                ? <a class="s-text13 active1" href="#" onClick={() => {this.changeCategory("all")}}>All</a>
                : <a class="s-text13" href="#" onClick={() => {this.changeCategory("all")}}>All</a>
            }
    </PageHeader>
    <div class="categories">
        <div style={{"margin":"0px auto","width":"80%"}}>
            { this.state.displayProducts.map((item) => {
                return(
                    <Item key={item.id} item={item} style={{"display":"inline","width":"10%"}}/>
                )
              })
            }
        </div>
    </div>
    </div>
    )
  }
}

export default Home;
