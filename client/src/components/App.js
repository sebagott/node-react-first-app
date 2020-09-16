import React, {Component} from 'react';
import Header from './Header';
import Footer from "./Footer";
import MountainSearch from "./MountainSearch";
import Container from "react-bootstrap/Container";
import './App.css';
import WeatherInfo from "./WeatherInfo";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAppStarted: false,
            selected: null
        }
    }
    handleStartApp = () => {
        this.setState({
            isAppStarted: true
        });
    }
    handleSelection = (option) => {
        this.setState({
            selected: option
        });
    }
    displayWeatherInfo = () => {
        return (
            <WeatherInfo
                location={this.state.selected}
            />
        )

    }
    displayMap = () => {
        const position = [this.state.selected.lat, this.state.selected.lon];
        const zoom = 8;
        return (
            <Col xs={12} md={5} className="Map-container align-items-center">
                <Map center={position} zoom={zoom}>
                    <TileLayer
                    attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
                    url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
                    />
                    <Marker position={position}>
                        <Popup>
                            <b>{`${this.state.selected.name} (${this.state.selected.altitude} m.a.s.l.)`}</b>
                        </Popup>
                    </Marker>
                </Map>
                <p><i>* The coordinates of a mountain are approximate values and should not be used for exact navigation.</i></p>
            </Col>
            )
    }
    displayAppContent = () => {
        return (
            <Container fluid className="AppContent">
                <Row className="justify-content-around">
                    <Col xs={12} md={7}>
                        <MountainSearch
                            minQueryLength={4}
                            placeholder={"🔍 Search for a mountain by name (e.g. Cerro El Plomo)"}
                            onSelection={this.handleSelection}
                        />
                        {this.state.selected && this.displayWeatherInfo()}
                    </Col>
                    {this.state.selected && this.displayMap()}
                </Row>

            </Container>
        )
    }
    render(){
        console.log("Rendering... state= ", this.state);
        return (
                <Container fluid className="App">
                    <Header
                        title="Sebastián Gálvez: A Node.js & React.js App"
                        subtitle="This app allows you to search for a mountain in our database and get a current weather report."
                        startAppHandler={this.handleStartApp}/>
                    {this.state.isAppStarted && this.displayAppContent()}
                    <Footer/>
                </Container>
            )
    }
}

export default App;
