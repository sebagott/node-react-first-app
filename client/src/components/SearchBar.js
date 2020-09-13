import React, {Component} from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";
import './SearchBar.css'

export default class SearchBar extends Component{
    state = {
        showResults: false,
        query: ""
    }

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    handleSubmit(event){
        event.preventDefault();
        console.log(`Querying results for: '${this.state.query}'`)

    }
    handleChange(event){
        const query = event.target.value;
        if(query.length >= this.props.minQueryLength) {
            console.log("Can fetch from api and start showing results");
            this.setState({
                showResults: true,
                query: query
            });
        }
    }
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup as={Row} className="align-items-end justify-content-center" controlId="formSearchBar">
                    <Col xs={10} md={6}>
                        <Form.Control
                            className="transparent"
                            type="text"
                            placeholder={this.props.placeholder}
                            onChange={this.handleChange}
                        />
                    </Col>
                    <Col xs={2} md={2} className="text-left">
                        <Button variant="outline-light" type="submit">
                            Search
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}