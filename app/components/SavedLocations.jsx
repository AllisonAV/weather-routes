import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import firebase from 'APP/fire'
import store from '../store'
const auth = firebase.auth()
const db = firebase.database()

export default class SavedLocations extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }

    this.receiveData = this.receiveData.bind(this)
    this.retrieveWeather = this.retrieveWeather.bind(this)
  }

  componentWillMount() {
    this.receiveData()
  }

  receiveData = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const ref = db.ref('locations/' + auth.currentUser.uid)
        ref.once('value')
        .then(snapshot => {
          this.setState({data: snapshot.val()})
        })
        .catch(error => console.log(error))
      }
    })
  }

  retrieveWeather = (e) => {
    let params = e.target.getAttribute('data-item')
    .split('|')
    .filter(param =>
      param !== 'empty'
      )

    db.ref(`usage/${Date()} API Calls:${params.length}`).set({
      name: auth.currentUser.displayName || 'Guest',
      userId: auth.currentUser.uid,
      route: params.join('|'),
      type: 'Current Data - Saved Locations'
    })

    switch (params.length) {
    case 1:
      this.props.getCurrTemp1(params)
        .then(() => {
          store.getState()
          browserHistory.push(`/weather/${params[0]}`)
        })
      break
    case 2:
      this.props.getCurrTemp2(params)
        .then(() => {
          store.getState()
          browserHistory.push(`/weather/${params[0]}/${params[1]}`)
        })
      break
    case 3:
      this.props.getCurrTemp3(params)
        .then(() => {
          store.getState()
          browserHistory.push(`/weather/${params[0]}/${params[1]}/${params[2]}`)
        })
      break
    case 4:
      this.props.getCurrTemp4(params)
        .then(() => {
          store.getState()
          browserHistory.push(`/weather/${params[0]}/${params[1]}/${params[2]}/${params[3]}`)
        })
      break
    }
  }

  render() {
    return (
      <div>
        <table className="table-striped">
          <thead>
          </thead>
          <tbody>
        {this.state.data && Object.keys(this.state.data).map(key => {
          return (
            <tr key={key}
                className='well-sm'>
              <td>
                <button
                  className="btn btn-primary btn-loc"
                  type="button"
                  data-item={this.state.data[key].routeParams}
                  id={key}
                  onClick={this.retrieveWeather}>Weather
                </button>
              </td>
              <td>{key}:</td>
              <td>{this.state.data[key].location1 !== 'empty'
                ? this.state.data[key].location1
                : <div /> }
              </td>
              <td>{this.state.data[key].location2 !== 'empty'
                ? this.state.data[key].location2
                : <div /> }
              </td>
              <td> {this.state.data[key].location3 !== 'empty'
                ? this.state.data[key].location3
                : <div /> }
              </td>
              <td>{this.state.data[key].location4 !== 'empty'
                ? this.state.data[key].location4
                : <div /> }
              </td>
            </tr>
          )
        })
        }
        </tbody>
        </table>
      </div>
    )
  }
}
