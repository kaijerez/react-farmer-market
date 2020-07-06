import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling } from '@fortawesome/free-solid-svg-icons'
import UserMode from './UserMode';


export default class Navigation extends React.Component{
    render (){
		return (
			<Navbar expand="lg">
				<FontAwesomeIcon style={{ color: 'green', marginRight:'5px' }} icon={faSeedling}/>
				<Navbar.Brand className="text-light">
					Farmers Market
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
					<Link to={"/"} className="nav-link">Home</Link>
						<Link to={"/products"} className="nav-link">Products</Link>
						<Link to={"/farmers"} className="nav-link">Farmers</Link>
						<Link to={"/articles"} className="nav-link">Articles</Link>
					</Nav>
				</Navbar.Collapse>
				<UserMode></UserMode>
			</Navbar>
		)
    }
}
