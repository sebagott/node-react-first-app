import React, {Component} from 'react';
import Header from './components/Header';
import Footer from "./components/Footer";
import './App.css';

class App extends Component {
    state = {mountains: []}

    componentDidMount() {
        fetch('http://localhost:3001/api/mountains')
            .then(res => {
                console.log(res);
                return res.json()
            })
            .then(mountains =>{
                console.log(mountains);
                this.setState({mountains})
            })
            .catch( error => console.log(error))
    }
    render(){
        return (
            <div className="App">
                <Header title="Sebastián Gálvez: A Node.js & React.js App"/>
                <div className="Content">
                    <h1>Mountains</h1>
                    {this.state.mountains.map(mountain =>
                        <div key={mountain.id}>
                            {mountain.name} ({mountain.altitude} m.a.s.l.) at {mountain.location[0]}°, {mountain.location[1]}°
                        </div>
                    )}
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
