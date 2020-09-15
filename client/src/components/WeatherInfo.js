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
        return (
            <Container className="WeatherReport">
                <h2> Weather Report </h2>
                <Row className="justify-content-center">
                    <Col>
                        <div className="MainWeatherInfo">
                            <img alt="Weather Icon" src={`http://openweathermap.org/img/wn/${this.state.weatherInfo.weather[0].icon}@4x.png`}/>
                            <h3>{this.state.weatherInfo.weather[0].main} ({this.state.weatherInfo.weather[0].description})</h3>
                            <h1 className="TemperatureInfo"> {`${Number.parseFloat(this.state.weatherInfo.main.temp -273).toFixed(1)} °C`}</h1>
                            <label>{"Humidity:"}</label>
                            <h3>{this.state.weatherInfo.main.humidity}%</h3>
                        </div>
                    </Col>
                    <Col>
                            <label>{"Wind:"}</label>
                            <p>
                                {`${JSON.stringify(this.state.weatherInfo.wind, null,4)}`}
                            </p>
                    </Col>
                    <Col>
                        <p>
                            {`${JSON.stringify(this.state.weatherInfo.main, null,4)}`}
                        </p>
                    </Col>
                </Row>
                <Row className="justify-content-center">

                </Row>
            </Container>
        )
    }
    render(){
        return (
            <Row className="justify-content-center">
                <Col xs={12}>
                    {this.state.weatherInfo && this.displayWeatherReport()}
                </Col>
            </Row>
        )
    }

}
export default WeatherInfo;