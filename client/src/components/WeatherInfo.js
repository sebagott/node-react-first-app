import React, {Component} from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import './WeatherInfo.css'

class WeatherInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: props.location,
            weatherInfo: null
        }
    }
    componentDidMount() {
        console.log(`Fetching weather info for ${this.state.location.name}...`);
        fetch(`http://localhost:3001/api/mountains/${this.state.location.value}/weather`)
            .then(response => response.json())
            .then((weatherInfo) => {
                if(weatherInfo.cod === 200){
                    console.log("Weather info", weatherInfo);
                    this.setState({
                        weatherInfo: weatherInfo
                    });
                }
                else{
                    console.log(weatherInfo);
                }

            })
            .catch(error => console.log(error));
    }
    displayWeatherReport() {
        const rotationStr = `rotate(${this.state.weatherInfo.wind.deg}deg)`;
        const arrowStyleRotation = { transform: rotationStr, WebkitTransform: rotationStr }
        return (
            <Container fluid className="WeatherReport  h-100">
                <h2> Weather Report </h2>
                <Row className="justify-content-between">
                    <Col xs={12} md={6} className="MainWeatherInfo">
                            <img alt="Weather Icon" src={`http://openweathermap.org/img/wn/${this.state.weatherInfo.weather[0].icon}@4x.png`}/>
                            <h2>{this.state.weatherInfo.weather[0].main}</h2>
                            <h4>({this.state.weatherInfo.weather[0].description})</h4>
                            <h1 className="TemperatureInfo"> <span>🌡</span>️ {`${Number.parseFloat(this.state.weatherInfo.main.temp).toFixed(1)} °C`}</h1>
                    </Col>
                    <Col xs={12} md={6} className="WeatherInfoVariables">
                        <Row className="mt-1">
                            <Col xs={12} md={2} className="align-self-start">{"Humidity: "}</Col>
                            <Col>{this.state.weatherInfo.main.humidity}%</Col>
                        </Row>
                        <Row className="mt-3 align-items-center">
                            <Col xs={12} md={2} className="align-self-start">{"Wind: "}</Col>
                            <Col md={10}>
                                <Row className="justify-content-center align-items-center">
                                    <Col xs={10} className="text-right">{`${this.state.weatherInfo.wind.speed} m/s (${this.state.weatherInfo.wind.deg}°)`}</Col>
                                    <Col xs={2} className="text-left">
                                        <div className="windArrow">
                                            <div className="arrow" style={arrowStyleRotation}/>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>

                        </Row>
                        <Row className="mt-3">
                            <Col xs={12} md={2} className="align-self-start">{"Pressure: "}</Col>
                            <Col> {`${this.state.weatherInfo.main.pressure} hPa`}</Col>
                        </Row>
                        <Row className="mt-3">
                            <Col xs={12} md={2} className="align-self-start">{"Station: "}</Col>
                            <Col> {`${this.state.weatherInfo.name}`}</Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
    render(){
        return (
            <Row className="justify-content-center align-items-center">
                <Col xs={12}>
                    {this.state.weatherInfo && this.displayWeatherReport()}
                </Col>
            </Row>
        )
    }

}
export default WeatherInfo;