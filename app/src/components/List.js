import React, { Component } from 'react';
import './index.css';

import Details from './Details';

class List extends Component {
    constructor(props) {
        super(props);
        this._handleDetailsClick = this._handleDetailsClick.bind(this);
        this.state = {
            breweries: props.breweries,
            showDetails: false,
            brewery_info: null
        }
    }

    _handleDetailsClick(brewery_info) {
        this.setState({
            showDetails: true,
            brewery_info: brewery_info
        });
    }

    render() {
        const breweriesJSX = this.state.breweries.map((brewery, i) => {
            const type         = (brewery.brewery_type !== "") ? brewery.brewery_type : "*type not given*";
            const street       = (brewery.street !== "") ? brewery.street : "*street not given*";
            const postal_code  = (brewery.postal_code !== "") ? brewery.postal_code : "*zip code not given*";
            const website_link = <a href={brewery.website_url}
                                    target={"_blank"}
                                    rel={"noopener noreferrer"}>{brewery.website_url}</a>;
            const website      = (brewery.website_url !== "") ? website_link : "*website not given*";

            const brewery_info = {
                name: brewery.name,
                type: type,
                street: street,
                city: brewery.city,
                state: brewery.state,
                postal_code: postal_code,
                website: website,
                latitude: brewery.latitude,
                longitude: brewery.longitude,
            }

            return (
                <div key={brewery.id}>
                    <div> <b>Name</b>: {brewery_info.name} <button onClick={this._handleDetailsClick.bind(this, brewery_info)}> <b>More details</b> </button> </div> 
                    <div> <b>Type</b>: {brewery_info.type}</div>
                    <div> <b>Address</b>: {brewery_info.street}, {brewery_info.city}, {brewery_info.state}, {brewery_info.postal_code}</div>
                    <div> <b>Website</b>: {brewery_info.website}</div>
                    <br/>
                </div>
            )
        });

        if (this.state.showDetails === false) {
            return (
                <div>
                    {breweriesJSX}
                </div>
            )
        } else {
            return (
                <div>
                    <Details brewery_info={this.state.brewery_info} breweries={this.state.breweries}/>
                </div>
            )
        }
    }
}

export default List;