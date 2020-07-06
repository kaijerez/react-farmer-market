import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import {Container, Col} from 'react-bootstrap';

export default class Footer extends React.Component{
    render(){
        let fullYear = new Date().getFullYear();
        return (
            <Navbar fixed="bottom">
                <Container lg={12} className="text-center text-muted">
                    <Col><div className="footerFont">{fullYear}-{fullYear+1} Philippines, All Rights Reserved by Karen Barranco</div></Col>
                </Container>
            </Navbar>
        )
    }
}

