import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

export default class MapGoogle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: []
    }

    this.getWeather = this.getWeather.bind(this)
  }

  // tie map into component state.  Anything to rerender needs to interact to state

  componentDidMount() {
    console.log('google', window.google)
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7413549, lng: -73.9980244},
      zoom: 10
    })
    var myLatlng = new window.google.maps.LatLng(40.705189, -74.009209)
    var marker = new window.google.maps.Marker({
      position: myLatlng
    })
    // Add the marker to the map by calling setMap()
    // marker.setMap(this.map)

// when user clicks, add marker to map, and add the lat and log to the state markers array
    this.map.addListener('click', e => {
      const latLng = {
        lat: e.latLng.lat(), lng: e.latLng.lng() }
      var marker = new window.google.maps.Marker({
        position: latLng,
        map: this.map
      })
      var newLoc = this.state.markers.concat(latLng)
      this.setState({ markers: newLoc })
    })
  }
  componentWillUnmount() {
    // good idea to unmount map in future
  }

  getWeather = function() {
    const param1 = `${this.state.markers[0].lat},${this.state.markers[0].lng}`
    const param2 = `${this.state.markers[1].lat},${this.state.markers[1].lng}`
    this.props.getCurrTemp(param1, param2)
    .then(() => {
      browserHistory.push(`/weather/${param1}/${param2}`)
    })
  }

  render() {
    return (
      <div>
        <button className="btn btn-primary map-button"
                  onClick={this.getWeather} > Get Weather
        </button>
        <div id="map">
        </div>
      </div>
    )
  }
}
