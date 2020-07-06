import React from 'react';
import axios from 'axios';
import { Form, Card, Button, ButtonGroup, Row, Col } from 'react-bootstrap';

export default class ProductRegistration extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.productChanged = this.productChanged.bind(this);
  }

  componentDidMount() {
    const productId = this.props.match.params.id;
    if (productId) {
      axios.get("http://localhost:8081/rest/products/" + productId)
        .then(response => {
          if (response != null) {
            this.setState({
              id: response.data.id,
              name: response.data.name,
              description: response.data.description,
              farmerId: response.data.farmerId,
              price: response.data.price,
              measurement: response.data.measurement,
            })
          }
        }).catch((error) => {
          console.error("Error:" + error)
        });
    }
    axios.get("http://localhost:8081/rest/farmers/")
      .then((response) => {
        this.setState({ farmers: response.data })
    })
  }

  productChanged = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  initialState = {
    id: '', name: '', description: '', farmerId: '', measurement: '', price: '', farmers: []
  }

  createProduct = (event) => {
    event.preventDefault();
    const product = {
      name: this.state.name,
      description: this.state.description,
      farmerId: this.state.farmerId,
      measurement: this.state.measurement,
      price: this.state.price
    }

    axios.post("http://localhost:8081/rest/products/add", product)
      .then(response => {
        if (response.data != null) {
          this.setState(this.initialState);
          console.log("Product successfully added");
        }
      });

  }

  updateProduct = (event) => {
    event.preventDefault();
    const product = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      farmerId: this.state.farmerId,
      measurement: this.state.measurement,
      price: this.state.price
    }

    axios.put("http://localhost:8081/rest/products/edit/" + this.state.id, product)
      .then(response => {
        if (response.data != null) {
          this.setState(this.initialState);
          console.log("Product successfully updated");
        }
      });
    this.setState(this.initialState);
  }

  backToProductList = () => {
    return this.props.history.push("/products");
  }

  render = () => {
    const { name, description, farmerId, price, measurement } = this.state
    return (
      <div className="container">
        <Form onReset={this.resetProduct} onSubmit={this.state.id ? this.updateProduct : this.createProduct} id="productFormId">
          <Card className="border text-back">
            <Card.Header>
              {this.state.id ? 'Update Product Details' : 'Add product'}
            </Card.Header>
            <Card.Body>
              <Form.Group as={Row} controlId="productName">
                <Form.Label column sm={4}>
                  Product Name
                </Form.Label>
                <Col>
                  <Form.Control required autoComplete="off"
                    value={name}
                    onChange={this.productChanged}
                    name="name"
                    placeholder="Product Name" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="price">
                <Form.Label column sm={4}>
                  Price
                </Form.Label>
                <Col>
                  <Form.Control required autoComplete="off"
                    value={price}
                    onChange={this.productChanged}
                    name="price"
                    type="number"
                    placeholder="Price" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="farmerId">
                <Form.Label column sm={4}>
                  Company Name
                </Form.Label>
                <Col>
                  <Form.Control as="select"
                    name="farmerId"
                    value={farmerId}
                    onChange={this.productChanged}
                    placeholder="Company Name" ><option>Please select farmer</option>
                    {this.state.farmers.map((farm) => <option key={farm.companyName} value={farm.id}>{farm.companyName}</option>)}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="measurement">
                <Form.Label column sm={4}>
                  Unit of Measure
                      </Form.Label>
                <Col>
                  <Form.Control required autoComplete="off"
                    name="measurement"
                    value={measurement}
                    onChange={this.productChanged}
                    placeholder="Unit of Measure" />
                </Col>
              </Form.Group>
              <Form.Group controlId="farmerDescription" as={Row}>
                <Form.Label column sm={4}>
                  Description
                      </Form.Label>
                <Col>
                  <Form.Control name="description" autoComplete="off"
                    value={description}
                    onChange={this.productChanged}
                    as="textarea" rows="3"
                    placeholder="description here" />
                </Col>
              </Form.Group>
            </Card.Body>
            <Card.Footer style={{ "textAlign": "right" }}>
              <ButtonGroup>
                <Button size="sm" className="btn btn-primary" type="submit">{this.state.id ? 'Save' : 'Create'}</Button>{' '}
                <Button size="sm" variant="info" type="reset">Reset </Button>{' '}
                <Button size="sm" className="btn btn-primary" type="button" onClick={this.backToProductList}>Back to Product List </Button>
              </ButtonGroup>
            </Card.Footer>
          </Card>
        </Form>
      </div>
    );
  }
}