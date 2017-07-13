import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

export default class MapGoogle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: []
    }

    this.getWeather = this.getWeather.bind(this)
    this.clearMarkers = this.clearMarkers.bind(this)
    this.map
    this.markers = []
  }

  // tie map into component state.  Anything to rerender needs to interact to state

  componentDidMount() {
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7413549, lng: -73.9980244},
      zoom: 10
    })
    var myLatlng = new window.google.maps.LatLng(40.705189, -74.009209)
    this.markers[this.markers.length] = new window.google.maps.Marker({
      position: myLatlng
    })
    // Add the marker to the map by calling setMap()
    // marker.setMap(this.map)

// when user clicks, add marker to map, and add the lat and log to the state markers array
    this.map.addListener('click', e => {
      const latLng = {
        lat: e.latLng.lat(), lng: e.latLng.lng() }
      this.markers[this.markers.length] = new window.google.maps.Marker({
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

  clearMarkers = function(e) {
    // setMapOnAll(null)
    this.markers.forEach(marker =>
      marker.setMap(null)
      )
    window.google.maps.event.trigger(this.map, 'resize')
    this.setState({ markers: [] })
  }

  render() {
    return (
      <div>
        <div className="floating-panel">

          <button className="btn btn-primary"
                  onClick={this.getWeather} > Get Weather
          </button>
          <button className="btn btn-primary"
                  onClick={this.clearMarkers} > Clear Markers
          </button>
        </div>
        <div id="map">
        </div>
      </div>
    )
  }
}

 /*       <button className="btn btn-primary btn-center"
                  onClick={this.getWeather} > Get Weather
        </button>

        */
