import React, { Component } from 'react'
import { GoogleApiWrapper } from 'google-maps-react'
import GMap from '../components/GMap'

export class Container extends Component {
  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }
    // if (!this.props.loaded) {
    //   console.log('PROPS', this.props)
    //   return <div>Loading...</div>
    // }
    return (
      <div style={style}>
        <GMap google={this.props.google} />
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyALdYhAuSJu4JnAM_plBiHdoHVbiE1L0yY'
})(Container)
