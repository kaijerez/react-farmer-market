import React from 'react';
import './App.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navigation from './components/common/Navigation';
import FarmerRegistration from './components/farmer/FarmerRegistration';
import FarmerList from './components/farmer/FarmerList';
import ProductList from './components/product/ProductList';
import ProductRegistration from './components/product/ProductRegistration';
import Footer from './components/common/Footer';
import Welcome from './components/Welcome';
import Articles from './components/articles/Articles';
import { Container,Row } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App() {
  return (
    <Router>
      <Navigation/>
      <Route render={({location})=>(
        <TransitionGroup>
          <CSSTransition
          key={location.key}
          timeout={300}
          classNames="fade">
          <Switch location={location}>
            <React.Fragment>
              <Route path="/" exact component={Welcome}/>
                <Container>
                  <Row className="centered">
                    <Route path="/farmers" exact component={FarmerList}/>
                    <Route path="/farmerRegistration/edit/:id" exact component={FarmerRegistration}/>
                    <Route path="/farmerRegistration" exact component={FarmerRegistration}/>
                    <Route path="/products" exact component={ProductList}/>
                    <Route path="/productRegistration/edit/:id" exact component={ProductRegistration}/>
                    <Route path="/productRegistration/show/:id" exact component={ProductList}/>
                    <Route path="/productRegistration" exact component={ProductRegistration}/>
                    <Route path="/articles" exact component={Articles}/>
                  </Row>
                </Container>
              </React.Fragment>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      )}/>
      <Footer/>
    </Router>
  );
}

export default App;
