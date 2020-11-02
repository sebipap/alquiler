import React, {Component} from 'react'
import mapboxgl from 'mapbox-gl'
 
mapboxgl.accessToken = 'pk.eyJ1Ijoic2ViaXBhcHMiLCJhIjoiY2szNHhyZnVpMDA1MjNua2VzY212bzlnMSJ9.EVcwNe2lyq9FE6tXnnEauA';

export default class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
        lng: 5,
        lat: 34,
        zoom: 2
        }
    }
    componentDidMount() {
        const map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [this.state.lng, this.state.lat],
        zoom: this.state.zoom
        })
    }

    render() {
        return (
        <div>
        <div ref={el => this.mapContainer = el} className="mapContainer" />
        </div>
        )
        }
}