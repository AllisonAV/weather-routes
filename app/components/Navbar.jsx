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

    this.handleDisplayName = this.handleDisplayName.bind(this)
    this.handleUpdateName = this.handleUpdateName.bind(this)
    this.determineIfDisplayName = this.determineIfDisplayName.bind(this)
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

  determineIfDisplayName = function() {
    return auth && auth.currentUser && auth.currentUser.displayName
      ?
        <div>Welcome {auth.currentUser.displayName} </div>
      :

        auth && auth.currentUser && auth.currentUser.isAnonymous

          ?
            <div> Welcome Guest </div>
          :
            <div>
                <input type="text"
                      placeholder="Enter Name"
                      className="form-control"
                      onChange={this.handleDisplayName}
                      name="userName"
                      onClick={this.handleUpdateName}/>
            </div>
  }

  handleDisplayName = function(e) {
    e.preventDefault()
    this.setState({
      displayName: e.target.value
    })
  }

  handleUpdateName = function(e) {
    e.preventDefault()
    auth.currentUser.updateProfile({
      displayName: this.state.displayName
    })
    .then(function() {
      console.log('success')
    })
    .catch(() => {
      console.log('error')
    })
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
           src="http://icons.wxug.com/graphics/wu2/logo_130x80.png"
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
      <div className="welcome">{this.determineIfDisplayName()}
      </div>
      <button>
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
 /*
holding code for later
    <div className="navbar-header">
      {auth && auth.currentUser.displayName
        ? <div>Welcome {auth.currentUser.displayName} </div>
        : !!window.loggedIn
          ?
            <div>
              <input type="text"
                    placeholder="Enter Name"
                    className="form-control"
                    onChange={this.handleDisplayName}
                    name="userName"
                    onClick={this.handleUpdateName}/>
            </div>
          : <div> testing</div>
      }
    </div> */
