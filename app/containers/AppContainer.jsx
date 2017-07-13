import React, { Component } from 'React'
import Navbar from '../components/Navbar'

export default class AppContainer extends Component {
  render() {
    return (
    <div className="app-container">
      <Navbar />
      <div className="underNav">
      {
        this.props.children && React.cloneElement(this.props.children)
      }
      </div>
    </div>
    )
  }
}
