'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory, Link} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import firebase from 'APP/fire'

import store from './store'

import AppContainer from './containers/AppContainer'

// import Login from './components/Login'
import Login from './components/Login'
import SignUp from './components/SignUp'
// import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'

import SavedLocationsContainer from './containers/SavedLocationsContainer'
import WeatherContainer from './containers/WeatherContainer'
import MapGoogleContainer from './containers/MapGoogleContainer'
import WeatherLocationContainer from './containers/WeatherLocationContainer'

// Get the auth API from Firebase.
const auth = firebase.auth()
const email = new firebase.auth.EmailAuthProvider()

// Ensure that we have (almost) always have a user ID, by creating
// an anonymous user if nobody is signed in.
auth.onAuthStateChanged(user => user || auth.signInAnonymously())

// Further explanation:
//
// Whenever someone signs in or out (that's an "authStateChange"),
// firebase calls our callback with the user. If nobody is signed in,
// firebase calls us with null. Otherwise, we get a user object.
//
// This line of code thus keeps us logged in. If the user isn't signed
// in, we sign them in anonymously. This is useful, because when the user
// is signed in (even anonymously), they'll have a user id which you can
// access with auth.currentUser.uid, and you can use that id to create
// paths where you store their stuff. (Typically you'll put it somewhere
// like /users/${currentUser.uid}).
//
// Note that the user will still be momentarily null, so your components
// must be prepared to deal with that. This is unavoidable—with Firebase,
// the user will always be null for a moment when the app starts, before
// the authentication information is fetched.
//
// If you don't want this behavior, just remove the line above.

// Our root App component just renders a little frame with a nav
// and whatever children the router gave us.

// old code from dual-weathr
          // const ExampleApp = connect(
          //   ({ auth }) => ({ user: auth })
          // )(
          //   ({ user, children }) =>
          //     <div>
          //       <nav>
          //         {user ? <WhoAmI/> : <Login/>}
          //       </nav>
          //       {children}
          //     </div>
          // )

export default class LandingPage extends React.Component {
  componentWillMount() {
    this.unsubscribe = auth.onAuthStateChanged(user => {
    })
  }
  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }

  anonGuest = (evt) => {
    evt.preventDefault()
    auth.signInAnonymously()
      .then(() => {
        browserHistory.push('/app')
      })
      .catch(function(error) {
        window.alert(error)
      })
  }



  render() {
    return (
      <div className='jumbotron landing-container landingPageText'>
        <div>Welcome to Weather Routes!!</div>
        <div className='landingPageButtons'>
          <Link to='/login'><button className='btn btn-primary landing'>Log In</button></Link>
          <Link to='/signup'><button className='btn btn-primary landing'>Sign Up</button></Link>
          <button className='btn btn-primary landing'
                  onClick={this.anonGuest}>
                  Proceed As Guest
          </button>
        </div>
      </div>
    )
  }
}

const onWeatherLocationEnter = (nextRouterState) => {
  store.getState()
}

// const onAppEnter = (userId, replace, next) => {
//   setTimeout(() => {
//     unsubscribe()
//     replace('/login?' + userId)
//     next()
//   }, 300)
//   const unsubscribe = auth.onAuthStateChanged(user => {
//     // console.log('LandingPage COMPONENT_WILL_MOUNT, USER: ', user)
//     if (user) {
//       unsubscribe()
//       next()
//     }
//   })
// }

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={Login} email={email} />
      <Route path="/signup" component={SignUp} email={email} />
      <Route path="/app" component={AppContainer} >
        <IndexRedirect to="/weather" />
        <Route path="/weather" component={WeatherContainer} />
        <Route path="/weather/:location1/"
                component={WeatherLocationContainer}
                onEnter={onWeatherLocationEnter} />
        <Route path="/weather/:location1/:location2"
                component={WeatherLocationContainer}
                onEnter={onWeatherLocationEnter} />
        <Route path="/weather/:location1/:location2/:location3"
                component={WeatherLocationContainer}
                onEnter={onWeatherLocationEnter} />
        <Route path="/weather/:location1/:location2/:location3/:location4"
                component={WeatherLocationContainer}
                onEnter={onWeatherLocationEnter} />
        <Route path="/locations/:userId" component={SavedLocationsContainer} />
        <Route path="/map" component={MapGoogleContainer} />
        <Route path="/*" component={AppContainer} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
