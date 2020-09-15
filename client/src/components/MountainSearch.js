import React, {Component} from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SelectSearch from 'react-select-search';
import "./MountainSearch.css"

class MountainSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mountain: null,
        }
    }
    getOptions = (query) => {
        return new Promise((resolve, reject) => {
            if(query.length >= this.props.minQueryLength) {
                fetch(`http://localhost:3001/api/mountains?q=${query}`)
                    .then(response => response.json())
                    .then((mountains) => {
                        resolve(mountains.map((mountain) => {
                                return ({
                                        value: mountain.id,
                                        name: mountain.name,
                                        altitude: mountain.altitude,
                                        lat: mountain.location.coordinates[0],
                                        lon: mountain.location.coordinates[1]
                                })
                            }))
                    })
                    .catch(reject);
            }
        });
    }
    handleOptionClick = (event, option) => {
        this.setState({mountain:option});
        this.props.onSelection(option);
    }
    handleResetSearch = () => {
        this.setState({mountain:null});
        this.props.onSelection(this.state.mountain);
    }
    renderOption = (props, option, snapshot, className) =>{
        return (
            <button {...props} className={className} type="button" onClick={(event) => this.handleOptionClick(event, option)}>
                <span>{`${option.name} (${option.altitude} m.a.s.l.)`}</span>
            </button>
        );
    }
    displaySelectedValue = () => {
        return (
            <Col xs={12}>
                <div className="MountainSelected">
                    <span className="SelectedInfo">
                        {`${this.state.mountain.name} (${this.state.mountain.altitude} m.a.s.l.) @ ${this.state.mountain.lat}°, ${this.state.mountain.lon}°` }
                    </span>
                    <span className="ResetButton" onClick={this.handleResetSearch}>&times;</span>
                </div>
            </Col>
            )
    }
    displaySearchBar = () => {
        return (
            <Col xs={12}>
                <SelectSearch className="SearchBar"
                              options={[]}
                              getOptions={this.getOptions}
                              renderOption={this.renderOption}
                              search
                              closeOnSelect={false}
                              placeholder={this.props.placeholder}
                />
            </Col>
        )
    }
    render(){
            return (
                <Row className="justify-content-center">
                    {(this.state.mountain && this.displaySelectedValue()) || this.displaySearchBar()}
                </Row>
            )
        }

}
export default MountainSearch;