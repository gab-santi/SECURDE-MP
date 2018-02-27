import React, { Component } from 'react';
import {FormGroup, Grid, Col, Row, FormControl, ControlLabel, Button} from 'react-bootstrap';

var Parse = require('parse');

class CreateProduct extends Component {
  constructor(props){
    super(props);

    this.state = { name: '', category: '', subcategory: '', price: 0, stock: 0, image: [], description: ''}

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSubcategoryChange = this.handleSubcategoryChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleStockChange = this.handleStockChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    if(typeof this.props.product !== 'undefined'){
        this.setState({name: this.props.product.get('name'), category: this.props.product.get('category'),
        subcategory: this.props.product.get('subcategory'), price: this.props.product.get('price'), stock: this.props.product.get('stock'),
        description: this.props.product.get('description')});
    }
  }
  handleNameChange(event){
    this.setState({name:event.target.value}, () => {
      console.log("name: ",this.state.name);
    });
  }
  handleCategoryChange(event){
    this.setState({category:event.target.value});
  }
  handleSubcategoryChange(event){
    this.setState({subcategory:event.target.value});
  }
  handlePriceChange(event){
    this.setState({price:event.target.value});
  }
  handleStockChange(event){
    this.setState({stock:event.target.value});
  }
  handleImageChange(event){
    console.log("HELLO?: ", event.target.files[0]);
    this.setState({image:event.target.files[0]});
  }
  handleDescriptionChange(event){
    this.setState({description:event.target.value});
  }
  handleSubmit(event){
    var Query = Parse.Object.extend("Product");
    var qry = new Query();

    if(typeof this.props.product !== 'undefined'){
      qry = this.props.product;
    }
    qry.set("name",this.state.name);
    qry.set("category",this.state.category);
    qry.set("subcategory",this.state.subcategory);
    qry.set("price",parseFloat(this.state.price));
    qry.set("stock",parseFloat(this.state.stock));
    qry.set("description",this.state.description);

    qry.save().then((data) => {
      console.log("Signup Success");
      console.log(data.id);
      this.props.refresh();
      this.props.close();
      if(this.state.image !== 'undefined'){
        this.fileHandler(data);
      }
    }).catch(function(e){
      console.log(e);
    })
  }
  fileHandler(product) {
    var ParseFile = new Parse.File(this.state.image.name, this.state.image)
    ParseFile.save().then((data) => {
      var Object = Parse.Object.extend('Product')
      var _object = new Object();
      _object.id = product.id;

      _object.set('image', data)
      return _object.save();

    }).then((data) => {
      console.log('okay')
      this.props.refresh();
      this.props.close();
      //this.getDatas();
    }).catch((err) => {
      console.log(err)
    })
  }
  render(){
    var inputBoxStyle = {border: '1px solid #e6e6e6', borderRadius: '2px', padding: '5px', color: '#555555', width: '50%'};
    var rowStyle = { marginBottom: '15px' };
    return(
      <div>
        <Grid>
          <Row style={rowStyle}>
            <Col md={2}>
              Name
            </Col>
            <Col md={10} style={inputBoxStyle}>
              <input type="text" style={{"width":"100%"}} value={this.state.name} onChange={this.handleNameChange}/>
            </Col>
          </Row>
          <Row style={rowStyle}>
            <Col md={2}>
              Category
            </Col>
            <Col md={10} style={inputBoxStyle}>
              <input type="text" style={{"width":"100%"}} value={this.state.category} onChange={this.handleCategoryChange}/>
            </Col>
          </Row>
          <Row style={rowStyle}>
            <Col md={2}>
              Subcategory
            </Col>
            <Col md={10} style={inputBoxStyle}>
              <input type="text" style={{"width":"100%"}} value={this.state.subcategory} onChange={this.handleSubcategoryChange}/>
            </Col>
          </Row>
          <Row style={rowStyle}>
            <Col md={2}>
              Price
            </Col>
            <Col md={10} style={inputBoxStyle}>
              <input type="number" style={{"width":"100%"}} value={this.state.price} onChange={this.handlePriceChange}/>
            </Col>
          </Row>
          <Row style={rowStyle}>
            <Col md={2}>
              Stock
            </Col>
            <Col md={10} style={inputBoxStyle}>
              <input type="number" style={{"width":"100%"}} value={this.state.stock} onChange={this.handleStockChange}/>
            </Col>
          </Row>
          <Row style={rowStyle}>
            <Col md={2}>
              Image
            </Col>
            <Col md={10} style={inputBoxStyle}>
              <input type="file" style={{"width":"100%"}} onChange={this.handleImageChange}/>
            </Col>
          </Row>
          <Row style={rowStyle}>
            <Col md={2}>
              Description
            </Col>
            <Col md={10} style={inputBoxStyle}>
              <input type="text" style={{"width":"100%"}} value={this.state.description} onChange={this.handleDescriptionChange}/>
            </Col>
          </Row>
          <Col smOffset={10} sm={10}>
              <Button onClick={this.handleSubmit}>Add</Button>
          </Col>
        </Grid>
      </div>
    )
  }
}

export default CreateProduct;
