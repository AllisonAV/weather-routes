import React from 'react'
import { Link, browserHistory } from 'react-router'
import firebase from 'APP/fire'
import store from '../store'

const auth = firebase.auth()

// Do external logins in Login

// If you want to request additional permissions, you'd do it
// like so:
//
// google.addScope('https://www.googleapis.com/auth/plus.login')
//
// What kind of permissions can you ask for? There's a lot:
//   https://developers.google.com/identity/protocols/googlescopes
//
// For instance, this line will request the ability to read, send,
// and generally manage a user's email:
//
// google.addScope('https://mail.google.com/')

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      user: null
    }

    this.emailSubmit = this.emailSubmit.bind(this)
    this.anonSubmit = this.anonSubmit.bind(this)
  }
  componentDidMount() {
    window.loggedIn=false
    auth && this.setState({ user: auth.currentUser })
  }

  setEmailPassword = (evt) => {
    evt.preventDefault()
    this.setState({ [evt.target.id]: evt.target.value })
  }

  emailSubmit = (evt) => {
    evt.preventDefault()
    if (this.state.email.length && this.state.password.length) {
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          window.loggedIn=true
          browserHistory.push('/app')
        })
        .catch(error => {
          window.alert(error)
        })
    } else {
      window.alert('Please fill in both your email and password')
    }
  }

  anonSubmit = (evt) => {
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
    const auth = firebase.auth()
    const email = new firebase.auth.EmailAuthProvider()

    return (
      <div id="background-div">
        <div className="jumbotron login-container" >
          <form onSubmit={this.emailSubmit}
                className="form-horizontal">
            <div className="form-group">
              <input type="text"
                     className="login form-control"
                     id="email"
                     placeholder="Email"
                     onChange={this.setEmailPassword} />
            </div>
            <div className="form-group">
              <input type="password"
                     className="form-control"
                     id="password"
                     placeholder="Password"
                     onChange={this.setEmailPassword} />
            </div>
            <div className="form-group">
              <button type="submit"
                      className="login btn btn-primary btn-login"
                      onClick={this.emailSubmit}>
                <span className='glyphicon glyphicon-envelope'/>
                {'       Login with Email'}
              </button>
              <button type="submit"
                      className="login btn btn-primary btn-login"
                      onClick={this.anonSubmit}>
                <span className='glyphicon glyphicon-user' />
                {'        Proceed As Guest'}
              </button>
            </div>
          </form>
          <div>
            <br />
          </div>
            <hr />
          <div>
            <legend>Create an account</legend>
            {
              window.location.search
                ?
                <div>New to Weather Routes?
                  <Link to={'/signup' + window.location.search}>Sign up here!</Link>
                </div>
                :
                <div className='sign-up'>New to Weather Routes? <Link to="/signup" >Sign up here.</Link></div>
            }
          </div>
        </div >
      </div>
    )
  }
}

{/*               <img
                  id="icon"
                  src="http://www.stickpng.com/assets/images/584856bce0bb315b0f7675ad.png" alt="emailIcon" />
*/}
// import React from 'react'

// import firebase from 'APP/fire'

// const google = new firebase.auth.GoogleAuthProvider()

// // Firebase has several built in auth providers:
// // const facebook = new firebase.auth.FacebookAuthProvider()
// // const twitter = new firebase.auth.TwitterAuthProvider()
// // const github = new firebase.auth.GithubAuthProvider()
// // // This last one is the email and password login we all know and
// // // vaguely tolerate:
// // const email = new firebase.auth.EmailAuthProvider()

// // If you want to request additional permissions, you'd do it
// // like so:
// //
// // google.addScope('https://www.googleapis.com/auth/plus.login')
// //
// // What kind of permissions can you ask for? There's a lot:
// //   https://developers.google.com/identity/protocols/googlescopes
// //
// // For instance, this line will request the ability to read, send,
// // and generally manage a user's email:
// //
// // google.addScope('https://mail.google.com/')

// export default ({ auth }) => {
//   console.log('in login')
//   // signInWithPopup will try to open a login popup, and if it's blocked, it'll
//   // redirect. If you prefer, you can signInWithRedirect, which always
//   // redirects.
//   return (<button className='google login'
//            onClick={() => auth.signInWithPopup(google)}>Login with Google</button>)
// }
