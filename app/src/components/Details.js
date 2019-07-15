import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import List from './List';
import './Details.css';

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
            ? "*Map location not available!*"
            : <Map
                google={this.props.google}
                zoom={15}
                style={{ height: '85%', width: '100%' }}
                initialCenter={coordinates}
              >
                <Marker name={this.state.brewery_info.name} position={coordinates}/>
              </Map>

        const detailsJSX = (
            <div>
                <button onClick={this._handleBackButton} className="BackButton"> <b>BACK</b> </button>
                <div> <u><b>{this.state.brewery_info.name}</b></u>: </div>
                <div> <b>Address</b>: {this.state.brewery_info.street}, {this.state.brewery_info.city}, {this.state.brewery_info.state}, {this.state.brewery_info.postal_code} </div>
                <br/>
                <div>
                    {brewLocation}
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
