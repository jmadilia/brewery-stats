import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class BreweryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            breweries: [],
        }
    }

    async componentDidMount() {
        const url = 'https://api.openbrewerydb.org/breweries';
        const city = 'harrisburg';
        const state = 'pennsylvania';

        const response = await fetch(url + '?by_city=' + city + '&by_state=' + state);
        const data = await response.json();
        this.setState({breweries: data, loading: false});
        console.log(data);
    }

    render() {
        if (this.state.loading) {
            return <div>Loading...</div>;
        }

        if (!this.state.breweries.length) {
            return <div>No breweries found!</div>;
        }

        const breweriesJSX = this.state.breweries.map((brewery, i) => {
            const type = (brewery.brewery_type !== "")       ? brewery.brewery_type : "*type not given*";
            const street = (brewery.street !== "")           ? brewery.street : "*street not given*";
            const postal_code = (brewery.postal_code !== "") ? brewery.postal_code : "*zip code not given*";
            const website_link = <a href={brewery.website_url}
                                    target={"_blank"}
                                    rel={"noopener noreferrer"}>{brewery.website_url}</a>;
            const website = (brewery.website_url !== "")     ? website_link : "*website not given*";
            return (
                <div key={brewery.id}>
                    <div> {i+1}. <b>Name</b>:    {brewery.name}</div>
                    <div>        <b>Type</b>:    {type}</div>
                    <div>        <b>Address</b>: {street}, {brewery.city}, {brewery.state}, {postal_code}</div>
                    <div>        <b>Website</b>: {website}</div>
                    <br/>
                </div>
            )
        });

        return (
            <div>
                {breweriesJSX}
            </div>
        );
    }
}

// ========================================

ReactDOM.render(<BreweryList />, document.getElementById("root"));
