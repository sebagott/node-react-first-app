import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Footer.css'
export default class Footer extends Component {
  render () {
    return (
        <footer className="Footer">
            <Container fluid>
              <Row className="justify-content-center align-items-center mt-4">
                <Col>
                  <p> Website created by: <a className="App-link" href="https://github.com/sebagott">Sebastián Gálvez</a></p>
                </Col>
              </Row>
            </Container>
        </footer>
    )
  }

}