import React from 'react'
import { Link, browserHistory } from 'react-router'
import firebase from 'APP/fire'
const db = firebase.database()
const userRef = db.ref('users/')

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  setEmailPassword = (evt) => {
    this.setState({ [evt.target.id]: evt.target.value })
  }

  confirmPasswordsMatch = () => {
    if (this.state.password !== this.state.confirmPassword) {
      window.alert('The passwords you submitted do not match. Please try again.')
      this.refs.password.value = ''
      this.refs.confirmPassword.value = ''
      this.setState({
        password: '',
        confirmPassword: ''
      })
      return false
    } else {
      return true
    }
  }

  emailSubmit = (evt) => {
    evt.preventDefault()
    // First confirm email and password & confirm password are all entered
    if (this.state.email.length && this.state.password.length && this.state.confirmPassword) {
      // confirmPasswordsMatch function return a boolean, true if they match, false if not
      if (this.confirmPasswordsMatch()) {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then((user) => {
            const queryString = window.location.search
          })
          .catch(error => {
            window.alert(error)
          })
      }
    } else {
      window.alert('Please fill in both your email and password')
    }
  }

  redirectToLogin = (e) => {
    e.preventDefault()
    browserHistory.push('/login/' + window.location.search)
  }

  render() {
    const auth = firebase.auth()
    const email = new firebase.auth.EmailAuthProvider()
    return (
      <div id="background-div">
        <div className="jumbotron login-container">
          <form onSubmit={this.emailSubmit}
            className="form-horizontal">
            <legend>Sign up</legend>
            <div> Welcome to Weather Routes! Already have an account?
            <a onClick={this.redirectToLogin}
               href="">  Sign in.</a>
            </div>
            <hr />
            <div className="form-group">
              <div>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  onChange={this.setEmailPassword} />
              </div>
            </div>
            <div className="form-group">
              <div>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  ref="password"
                  onChange={this.setEmailPassword} />
              </div>
            </div>
            <div className="form-group">
              <div>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  ref="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={this.setEmailPassword} />
              </div>
            </div>
            <div className="form-group">
              <div>
                <button type="submit"
                  className='login btn btn-primary btn-signup'>
                  <img
                    id="icon"
                    src="http://www.stickpng.com/assets/images/584856bce0bb315b0f7675ad.png"
                    alt="emailIcon" />
                  Sign up with Email</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
