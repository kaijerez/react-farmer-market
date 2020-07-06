import React from 'react'

import { Jumbotron, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Welcome extends React.Component {
    render() {
        return (
        <div>
            <Jumbotron className="j-farmer" fluid>
                <Container className="display-flex">
                    <div className="col-sm-12">
                        <h1>KNOW YOUR FOOD. <br />&nbsp;&nbsp;KNOW YOUR FARMER.</h1>
                        <p>
                            Buy freshly-picked fruits and vegetable from your trusted farmers.
                        </p>
                        <Link to={"/farmers"} className="btn btn-primary">Know Farmers</Link>{' '}
                    </div>
                </Container>
            </Jumbotron>
            <Jumbotron className="j-veg" fluid>
                <Container className="display-flex">
                    <div className="col-sm-12">
                        <h1>EAT FRESH, STAY HEALTHY.</h1>
                        <p>
                            Have fruits and vegetables if you want to lead a fruitful.
                        </p>
                        <Link to={"/products"} className="btn btn-primary">Know Products</Link>
                    </div>
                </Container>
            </Jumbotron>
        </div>
        )
    }
}
