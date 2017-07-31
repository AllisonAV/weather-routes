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

// when user clicks, add marker to map, and add the lat and log to the state markers array
    this.map.addListener('click', e => {
      if (this.markers.length <= 4) {
        const latLng = {
          lat: e.latLng.lat(), lng: e.latLng.lng() }
        this.markers[this.markers.length] = new window.google.maps.Marker({
          position: latLng,
          map: this.map
        })
        var newLoc = this.state.markers.concat(latLng)
        this.setState({ markers: newLoc })
      } else {
        window.alert('You can only enter in 4 locations')
      }
    })
  }
  componentWillUnmount() {
    // good idea to unmount map in future
  }

  getWeather = function() {
    let params = []
    switch (this.state.markers.length) {
    case 4:
      params.unshift(`${this.state.markers[3].lat},${this.state.markers[3].lng}`)
    case 3:
      params.unshift(`${this.state.markers[2].lat},${this.state.markers[2].lng}`)
    case 2:
      params.unshift(`${this.state.markers[1].lat},${this.state.markers[1].lng}`)  
    case 1:
      params.unshift(`${this.state.markers[0].lat},${this.state.markers[0].lng}`)
    }
    switch (params.length) {
    case 1:
      this.props.getCurrTemp1(params)
      .then(() => {
        browserHistory.push(`/weather/${params[0]}`)
      })
      break
    case 2:
      this.props.getCurrTemp2(params)
      .then(() => {
        browserHistory.push(`/weather/${params[0]}/${params[1]}`)
      })
      break
    case 3:
      this.props.getCurrTemp3(params)
      .then(() => {
        browserHistory.push(`/weather/${params[0]}/${params[1]}/${params[2]}`)
      })
      break
    case 4:
      this.props.getCurrTemp4(params)
      .then(() => {
        browserHistory.push(`/weather/${params[0]}/${params[1]}/${params[2]}/${params[3]}`)
      })
    }
  }

  clearMarkers = function(e) {
    // setMapOnAll(null)
    this.markers.forEach(marker =>
      marker.setMap(null)
      )
    const temp = this.markers[0]
    this.markers = []
    this.markers.push(temp)
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
