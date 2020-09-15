import React, {Component} from 'react';
import Header from './Header';
import Footer from "./Footer";
import MountainSearch from "./MountainSearch";
import Container from "react-bootstrap/Container";
import './App.css';
import WeatherInfo from "./WeatherInfo";

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
        if(this.state.selected){
            return (
                <WeatherInfo
                    location={this.state.selected}
                />
            )
        }
        else{
            return (
                <WeatherInfo
                    location={this.state.selected}
                    loading={true}
                />
            )
        }

    }
    displayAppContent = () => {
        return (
            <Container fluid className="AppContent">
                <MountainSearch
                    minQueryLength={4}
                    placeholder={"🔍 Search for a mountain by name (e.g. Cerro El Plomo)"}
                    onSelection={this.handleSelection}
                />
                {this.state.selected && this.displayWeatherInfo()}
            </Container>
        )
    }
    render(){
        console.log("Rendering... state= ", this.state);
        return (
                <Container fluid className="App">
                    <Header
                        title="Sebastián Gálvez: A Node.js & React.js App"
                        subtitle="This app allows you to search for a mountain in our database and get a weather forecast for a specific date."
                        startAppHandler={this.handleStartApp}/>
                    {this.state.isAppStarted && this.displayAppContent()}
                    <Footer/>
                </Container>
            )
    }
}

export default App;
