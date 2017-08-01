import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import firebase from 'APP/fire'
import store from '../store'
const auth = firebase.auth()

export default class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      user: '',
      displayName: '',
      userId: ''
    }

    this.displayName = this.displayName.bind(this)
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({userId: user.uid})
      } else {
        this.setState({userId: 'guest'})
      }
    })
  }

  displayName = function() {
    return auth && auth.currentUser && auth.currentUser.displayName
      ?
        <div>Welcome {auth.currentUser.displayName} </div>
      :

       <div> Welcome Guest </div>
  }

  render() {
    return (

<nav className="nav navbar-default navbar-fixed-top">
  <div className=""
       style={{
         display: 'flex',
         justifyContent: 'space-between',
         alignItems: 'center'
       }}>
    <div className="navbar-header">
      <img className="nav-img"
           src="https://icons.wxug.com/graphics/wu2/logo_130x80.png"
           style={{justifyContent: 'flex-start'}} />
    </div>
    <div className="collapse navbar-collapse"
         id="bs-example-navbar-collapse-1"
         style={{justifyContent: 'space-between'}}>
        <Link to="/weather"
              className="navbar-brand">Home</Link>
        <Link to="/map"
              className="navbar-brand">Map</Link>
        <Link to={`/locations/:${this.state.userId}`}
              className="navbar-brand">Your Locations</Link>
    </div>
    <div className="nav navbar-default rightside"
         style={{
           display: 'flex',
           justifyContent: 'flex-end',
           flexDirection: 'row'
         }}>
      <div className="welcome">{this.displayName()}
      </div>
      <button className="btn btn-navbar">
          {auth && auth.currentUser ?
          <h4 className='logout'
              onClick={() => {
                auth.signOut()
                browserHistory.push('/login')
              }}>Logout
          </h4>
          :
          <h4 className='login'
              onClick={() => {
                browserHistory.push('/login')
              }}>Login
          </h4>
        }
      </button>
    </div>
  </div>
</nav>
    )
  }
}
