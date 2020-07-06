import React from 'react';
import { Card, Button, ButtonGroup, Row, Form, Container, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductQuantity from './ProductQuantity';

export default class ProductList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            products : [],
            farmers: [],
            farmId:'',
            filterType:'',
            search: ''
        }

        this.filterChanged = this.filterChanged.bind(this); 
    }
    componentDidMount (){
        const farmerId = this.props.match.params.id;
        if (farmerId){
            this.filterByFarm(farmerId);
            this.setState({filterType: "farm", farmId: farmerId })
        } else {
            this.getProducts();
        }
        axios.get("http://localhost:8081/rest/farmers/")
        .then((response) => {
            this.setState({farmers: response.data})
        })
    }

    deleteProduct = (id) => {
        axios.delete("http://localhost:8081/rest/products/delete/" + id)
        console.log("successfully deleted");
        this.setState({
            products: this.state.products.filter(product => product.id !== id)
        })
    }

    getProducts = () => {
        axios.get("http://localhost:8081/rest/products/")
        .then((response) => {
            this.setState({products: response.data})
          })
    }

    searchProduct = (event) => {
        this.setState({
          search: event.target.value.substr(0,20)  
        })
    }

    filterByFarm = (farmId) => {
        axios.get("http://localhost:8081/rest/products/sort/?farm="+farmId)
        .then((response) => {
            this.setState({products: response.data})
        })
    }

    filterChanged = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
      }

      getFarmName= (id) =>{
        return this.state.farmers.filter(farm => farm.id === id).companyName;
      }

    render(){
        let filterProducts = this.state.products; 

        if (this.state.search){
             filterProducts = this.state.products.filter(
                (product) => {
                        return product.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
                }
            );
        }
        return (
            <Card.Body>
                <div className="productListTitle">
                    <div className="display-flex">
                        <h1> Product List</h1>
                    </div>
                    <Form>
                        <Form.Row className="filter-row">
                            <Form.Group className="col-sm-2" controlId="Sort">
                            <Form.Control  as="select"
                                name="filterType" 
                                value={this.state.filterType}
                                onChange={(e) => this.filterChanged(e) }>
                                <option value="DEFAULT" >Filter by</option>
                                <option key="farm" value="farm">Farm</option>)
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="col-sm-3" controlId="formGridState">
                                <Form.Control disabled={!this.state.filterType}  as="select"
                                    name="farmerId" 
                                    value={this.state.farmerId}
                                    onChange={(e) => this.filterChanged(e)} 
                                    placeholder="Company Name" >
                                    <option value="DEFAULT" >Please select farmer</option>
                                    {this.state.farmers.map((farm) => <option key={farm.companyName} value={farm.id}>{farm.companyName}</option>)}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group  className="display-flex" >
                                <ButtonGroup className="col-sm-7">
                                    <Button size="sm" className="btn btn-primary" type="button"  onClick={this.filterByFarm.bind(this,this.state.farmerId)} disabled={!this.state.farmerId || this.state.farmerId==="DEFAULT"} >Apply </Button>
                                    <Button size="sm" className="btn btn-primary" type="reset" onClick={this.getProducts.bind(this)} disabled={!this.state.farmerId || this.state.farmerId==="DEFAULT" } >Clear </Button>
                                    <Link to={"/productRegistration"} className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faPlus}/> Add Product</Link>  
                                </ButtonGroup>
                                <FormControl value={this.state.search}type="text" name="search" onChange={(e) => this.filterChanged(e) } placeholder="Search Product Name"/>
                            
                            </Form.Group>
                        </Form.Row>
                    </Form>
                    <Container>
                        <Row>
                        {
                            filterProducts.length === 0 ? <p>No products available</p> :
                            filterProducts.map((product,index) => (
                                <Card key={product.id }className="col-sm-3 product-card">
                                <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Cabbage_and_cross_section_on_white.jpg" />
                                <Card.Body>
                                    <Card.Title>Name: {product.name}</Card.Title><ProductQuantity/>
                                    <div>Price: PHP {product.price}</div>   
                                    <div>Description: {product.description}</div>
                                    <div>Farm Name: 
                                    {
                                    this.state.farmers.map(farm => 
                                    { if(farm.id === product.farmerId){
                                        return farm.companyName;
                                        } })
                                    }
                                    </div>
                                </Card.Body>
                                <Card.Footer>
                                    <Button size="sm" className="btn btn-primary">Add to Cart</Button>
                                    <ButtonGroup className="float-right">
                                        <Link title="edit" to={"/productRegistration/edit/"+product.id} className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faEdit}/></Link>
                                        <Button title="delete" size="sm" className="btn btn-primary btn-sm" onClick={this.deleteProduct.bind(this,product.id)}><FontAwesomeIcon icon={faTrash}/></Button>
                                    </ButtonGroup>
                                    </Card.Footer>
                                </Card>
                            ))
                        }
                    </Row>
                    </Container>
                </div>
            </Card.Body>
        )
    }
}