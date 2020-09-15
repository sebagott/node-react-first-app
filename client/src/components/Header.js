import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import logo from '../logo.svg';
import Button from "react-bootstrap/Button";
import './Header.css'



export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isAppStarted: false
    }

  }
  handleClick = () => {
    this.props.startAppHandler();
    this.setState({isAppStarted: true});
  }

  startButton = () => {
    return (
        <Row className="justify-content-center mb-4">
          <Col xs={8} md={2} className="text-center">
            <Button variant="primary" className="btn-lg" onClick={this.handleClick}>
              Start Here!
            </Button>
          </Col>
        </Row>
    )
  }
  render() {
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
                <Col>
                    <i className="Header-subtitle">{this.props.subtitle}</i>
                </Col>
              </Row>
              {((!this.state.isAppStarted) && this.startButton())}
            </Container>
        </header>
    )
  }

}