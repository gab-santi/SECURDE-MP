import React, { Component } from 'react';
import '../App.css';
import '../css/main.min.css';
import '../css/util.min.css';
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import { Grid, Row, Col, PageHeader, Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Shop extends Component{
  constructor(props){
    super(props);
    this.state = {sort1:'',sort1Options:[],
                  sort2:'',sort2Options:[]}

    this.handleSort1Change = this.handleSort1Change.bind(this);
    this.handleSort2Change = this.handleSort2Change.bind(this);
  }
  componentDidMount(){
    this.setState({sort1Options:[{label:"Default Sorting", value:1}, {label:"Popularity", value:2},
        {label:"Price: low to high", value:3}, {label:"Price: high to low", value:4}],
      sort2Options:[{label:"Price",value:1},{label:"$0.00 - $50.00",value:2},{label:"$50.00 - $100.00",value:3}
        ,{label:"$100.00 - $150.00",value:4},{label:"$150.00 - $200.00",value:5},{label:"$200.00+",value:6}]});
  }
  handleSort1Change (value) {
		this.setState({sort1: value});
  }
  handleSort2Change(value){
    this.setState({sort2:value});
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
                  <a class="s-text13 active1" href="#">All</a>
                </li>
                <li class="p-t-4">
                  <a class="s-text13 active1" href="#">Guitars</a>
                </li>
                <li class="p-t-4">
                  <a class="s-text13 active1" href="#">Pianos</a>
                </li>
                <li class="p-t-4">
                  <a class="s-text13 active1" href="#">Others lol</a>
                </li>
              </ul>
              <div class="search-product pos-relative bo4 of-hidden">
  							<input class="s-text7 size6 p-l-23 p-r-50" name="search-product" placeholder="Search Products..." type="text"/>

  							<button class="flex-c-m size5 ab-r-m color2 color0-hov trans-0-4">
  								<i class="fs-12 fa fa-search" aria-hidden="true"></i>
  							</button>
						  </div>
            </Col>
            <Col md={8}>
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
                  Showing 1–12 of 16 results
                </span>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Shop;
