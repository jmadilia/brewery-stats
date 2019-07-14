import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import './index.css';

import List from './List';

class Details extends Component {
    constructor(props) {
        super(props);
        this._handleBackButton = this._handleBackButton.bind(this);
        this.state = {
            breweries: props.breweries,
            brewery_info: props.brewery_info,
            showList: false,
        }
    }

    _handleBackButton() {
        this.setState({
            showList: true
        })
    }

    render() {
        const coordinates = {
            lat: this.state.brewery_info.latitude,
            lng: this.state.brewery_info.longitude,
        }

        const brewLocation = (this.state.brewery_info.longitude === null || this.state.brewery_info.latitude === null) 
            ? "*coordinates not given*"
            : <Map 
                google={this.props.google}
                zoom={this.props.zoom}
                style={{ height: '100%', width: '75%' }}
                initialCenter={coordinates}
              >
                <Marker position={coordinates}/>
              </Map>

        const detailsJSX = (
            <div>
                <button onClick={this._handleBackButton}> <b>BACK</b> </button>
                <div> <u>Details for <b>{this.state.brewery_info.name}</b></u>: </div>
                <div> <b>Address</b>: {this.state.brewery_info.street}, {this.state.brewery_info.city}, {this.state.brewery_info.state}, {this.state.brewery_info.postal_code} </div>
                <div>
                    <b>Location</b>: {brewLocation}
                </div>
            </div>
        )

        if (this.state.showList === false) {
            return (
                <div>
                    {detailsJSX}
                </div>
            )
        } else {
            return (
                <div>
                    <List breweries={this.state.breweries} />
                </div>
            )
        }
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_API_KEY
})(Details);
