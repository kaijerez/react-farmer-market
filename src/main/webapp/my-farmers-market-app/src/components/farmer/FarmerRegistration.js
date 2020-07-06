import React from 'react';
import Form from 'react-bootstrap/Form';
import { Card,Col,Row,Button, ButtonGroup} from 'react-bootstrap';
import axios from 'axios';

export default class FarmerRegistration extends React.Component {
    
constructor(props){
  super(props);
  this.state=this.initialState;
  this.createFarmer = this.createFarmer.bind(this);
  this.farmerChanged = this.farmerChanged.bind(this); 
}

componentDidMount(){
  const farmerId = this.props.match.params.id;
  console.log(this.props);
  if (farmerId){
    axios.get("http://localhost:8081/rest/farmers/" + farmerId)
    .then(response => {
      if(response != null) {
        this.setState({
          id: response.data.id,
          lastName: response.data.lastName,
          firstName: response.data.firstName,
          email: response.data.email,
          description: response.data.description
        })
      }

    }).catch((error) => {
      console.error("Error:" + error)

    });
}
}
  

backToFarmerList= () => {
  return this.props.history.push("/farmers");
}

createFarmer = (event) => { 
  event.preventDefault();

  const farmer = {
    firstName: this.state.firstName,
    lastName: this.state.lastName,
    companyName: this.state.companyName,
    description: this.state.description,
    email: this.state.email
  }

  axios.post("http://localhost:8081/rest/farmers/add", farmer)
  .then( response => {
    if (response.data != null) {
      this.setState(this.initialState);
      console.log("Farmer successfully added");
    }
     
  });
  this.setState(() => this.initialState)

}

updateFarmer = (event) => { 
  event.preventDefault();

  const farmer = {
    firstName: this.state.firstName,
    lastName: this.state.lastName,
    companyName: this.state.companyName,
    description: this.state.description,
    email: this.state.email
  }

  axios.put("http://localhost:8081/rest/farmers/edit/"+this.state.id, farmer)
  .then( response => {
    if (response.data != null) {
		this.setState(this.initialState);
		console.log("Farmer successfully added");
    }
     
  });
  this.setState(() => this.initialState)
}

onReset = () => {
  this.setState(() => this.initialState)
}

farmerChanged = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  })
}
  initialState = {
    id:'', firstName:'', lastName:'',companyName:'', email: '',description:''
  }
render = () => {
  const {lastName, firstName, description, email, companyName} = this.state
  return (
    <div className="container">
        <Form onReset={this.resetFarmer} onSubmit={this.state.id ? this.updateFarmer : this.createFarmer} id="farmerFormId"> 
          <Card className="border text-black">
            <Card.Header>
            {this.state.id ? 'Update Farmer Details' : 'Add Farmer'}  
            </Card.Header>
            <Card.Body>
              <Form.Group as={Row} controlId="farmerName">
              <Form.Label column sm={4}>
                  First Name
                </Form.Label>
                <Col>
                  <Form.Control required autoComplete="off"
                  value={firstName} 
                  onChange={this.farmerChanged} 
                  name="firstName" 
                  placeholder="First name" />
                </Col>
                <Form.Label column sm={2}>
                  Lastname
                </Form.Label>
                <Col>
                  <Form.Control required autoComplete="off" 
                  value={lastName} 
                  onChange={this.farmerChanged} 
                  name="lastName" 
                  placeholder="Last name" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="farmerCompanyName">
                <Form.Label column sm={4}>
                  Company Name
                </Form.Label>
                <Col >
                <Form.Control  
                name="companyName"  autoComplete="off"
                value={companyName}  
                onChange={this.farmerChanged} 
                placeholder="Company Name" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="farmerEmail">
                <Form.Label column sm={4}>
                  Email
                </Form.Label>
                <Col>
                  <Form.Control required autoComplete="off"
                  name="email" 
                  value={email} 
                  type="email"  
                  onChange={this.farmerChanged} 
                  placeholder="Email" />
                </Col>
              </Form.Group>
              <Form.Group controlId="farmerDescription" as={Row}>
                <Form.Label column sm={4}>
                Description
                </Form.Label>
                <Col>
                  <Form.Control name="description"  autoComplete="off"
                  value={description} 
                  onChange={this.farmerChanged} 
                  as="textarea" rows="3" 
                  placeholder="description here" />
                </Col>
              </Form.Group>
              </Card.Body>
            <Card.Footer style={{"textAlign": "right"}}>
              <ButtonGroup>
                  <Button size="sm" className="btn btn-primary" type="submit">{this.state.id ? 'Save' : 'Create'} </Button>
                  <Button size="sm" variant="info" type="reset">Reset </Button>{' '}
                  <Button size="sm" className="btn btn-primary" type="button" onClick={this.backToFarmerList}>Back to Farmer List </Button>
              </ButtonGroup>
            </Card.Footer>
          </Card>
        </Form>
        </div>
        );
  }
}
