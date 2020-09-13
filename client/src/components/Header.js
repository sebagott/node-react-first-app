import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import logo from '../logo.svg';
import './Header.css'
import SearchBar from "./SearchBar";
import Button from "react-bootstrap/Button";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStarted: false
    }
    this.handleStartButtonClick = this.handleStartButtonClick.bind(this);
  }
  handleStartButtonClick(props){
    this.setState({
      isStarted: true
    })
  }
  startButton(props){
    return (
        <Row className="justify-content-center mb-4">
          <Col xs={8} md={2} className="text-center">
            <Button variant="primary" className="btn-lg" onClick={this.handleStartButtonClick}>
              Start Here!
            </Button>
          </Col>
        </Row>
    )
  }
  searchBar(props){
    return (
        <SearchBar
            minQueryLength={4}
            placeholder={"Search for a mountain by name (e.g. Cerro El Plomo)"}/>
    )
  }
  render () {
    return (
        <header className="Header">
            <Container fluid>
              <Row className="align-items-center mb-2">
                <Col xs={12} md={2} className="text-right">
                  <img src={logo} className="Header-logo" alt="logo" />
                </Col>
                <Col xs={12} md={10} className="text-left">
                  <h1 className="Header-title"> {this.props.title} </h1>
                </Col>
              </Row>
              <Row className="justify-content-center mb-4">
                <i as={Col} className="Header-subtitle">This app allows you to search for a mountain in our database and get a weather forecast for a specific date. </i>
              </Row>
              {((!this.state.isStarted) && this.startButton()) || this.searchBar()}
            </Container>
        </header>
    )
  }

}