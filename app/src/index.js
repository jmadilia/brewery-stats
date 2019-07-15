import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import List from "./components/List";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "Harrisburg",
            state: "Pennsylvania",
            breweries: [],
            loading: true,
        }
    }

    async componentDidMount() {
        const url = 'https://api.openbrewerydb.org/breweries';
        const response = await fetch(url + '?by_city=' + this.state.city + '&by_state=' + this.state.state);
        const data = await response.json();
        this.setState({ 
            breweries: data,
            loading: false,
        });
    }

    render() {
        if (this.state.loading) {
            return <div>Loading...</div>;
        }

        if (!this.state.breweries.length) {
            return <div>No breweries found!</div>;
        }

        return (
            <div>
                <List breweries={this.state.breweries} />
            </div>
        )
    }
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
