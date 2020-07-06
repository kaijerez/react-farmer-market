import React from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus,faLeaf } from '@fortawesome/free-solid-svg-icons'
import { Button, ButtonGroup, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import DataTable from 'react-data-table-component';

export default class FarmerList extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            farmers: []
        }
    }
    componentDidMount (){
      axios.get("http://localhost:8081/rest/farmers/")
      .then((response) => {
          this.setState({farmers: response.data})
        })
    }
    deleteFarmer = (id,event) => {
        axios.delete("http://localhost:8081/rest/farmers/delete/" + id)
        console.log("successfully deleted");
        this.setState({
            farmers: this.state.farmers.filter(farmer => farmer.id !== id)
        })
    }
    render(){
        const columns = [
            {
              name: 'First Name',
              selector: 'firstName',
              sortable: true,
            },
            {
              name: 'Last Name',
              selector: 'lastName',
              sortable: true,
              right: true,
            },
            {
              name: 'Company Name',
              selector: 'companyName',
              sortable: true,
              right: true,
            },
            {
              name: 'Email',
              selector: 'email',
              sortable: true,
              right: true,
            },
            {
              name: 'Description',
              selector: 'description',
              sortable: true,
              right: true,
            },
            {
              name: 'Action',
              selector: 'action',
              sortable: false,
              right: true,
              cell: row => ( 
                  <ButtonGroup>
                    <Link data-toogle="tooltip" title="edit" to={"/farmerRegistration/edit/"+row.id} className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faEdit}/></Link>
                    <Button data-toogle="tooltip" title="delete" size="sm" className="btn btn-primary btn-sm" onClick={this.deleteFarmer.bind(this,row.id)}><FontAwesomeIcon icon={faTrash}/></Button>
                    <Link data-toogle="tooltip" title="view farmers"to={"/productRegistration/show/"+row.id} className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faLeaf}/></Link>
                  </ButtonGroup>
                )
            },
          ];
        return (
        <div className="container">
        <Card.Body>
            <h1>Farmer List</h1>
            <Link to={"/farmerRegistration"} className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faPlus}/> Add Farmer</Link>  
                <DataTable
                tableStyle="table table-hover table-striped table-bordered table-borderless table-responsive"
                  columns={columns}
                  data={this.state.farmers}
                  striped
                />
            
            <Link to={"/farmerRegistration"} className="btn btn-primary  btn-sm add-bottom"><FontAwesomeIcon icon={faPlus}/> Add Farmer</Link>  
        </Card.Body> 
        </div>
        
    )
    }
}
