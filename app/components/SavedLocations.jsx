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
    let params = e.target.getAttribute('data-item').split('|')

    this.props.getCurrTemp(params[0], params[1])
      .then(() => {
        store.getState()
        browserHistory.push(`/weather/${params[0]}/${params[1]}`)
      })

    // let waitToSendData = false

    // const sendParmsToQueue = () => {
    //   let ref = db.ref('apiQueue')
    //   // see if there is an object in the queue
    //   ref.once('value', snapshot => {
    //     if (snapshot.numChildren() > 0) {
    //       this.setState({waitToSendData: true})
    //       waitToSendData = true
    //     } else {
    //       ref = db.ref('apiQueue/' + auth.currentUser.uid)
    //       ref.set({
    //         param1: params[0],
    //         param2: params[1],
    //         param3: params[2],
    //         param4: params[3]
    //       })
    //     }
    //   })
    // }

    // const retrieveData = () => {
    //   // Attach an asynchronous callback to read the data in the apiQueue
    //   // Loop through data in queue with the forEach() method. The callback
    //   // provided to forEach() will be called synchronously with a DataSnapshot
    //   // for each child:
    //   const ref = db.ref('apiQueue')
    //   // query = ref.orderByKey().limitToFirst(1)
    //   ref.once('value', snapshot => {
    //     snapshot.forEach(child => {
    //       this.props.getCurrTemp(child.val().param1, child.val().param2)
    //       .then(() => {
    //         store.getState()
    //         browserHistory.push(`/weather/${child.val().param1}/${child.val().param2}`)
    //       })
    //       .then(() => {
    //         ref.child(auth.currentUser.uid).remove()
    //       })
    //     })
    //   })
    // }
    // sendParmsToQueue()
    // if (waitToSendData === false) {
    //   setTimeout(retrieveData, 5000)
    // } else {
    //   waitToSendData = true
    // }
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
                  className="btn btn-primary"
                  type="button"
                  data-item={this.state.data[key].routeParams}
                  id={key}
                  onClick={this.retrieveWeather}>Weather
                </button>
              </td>
              <td>{key}</td>
              <td>{this.state.data[key].location1}</td>
              <td>{this.state.data[key].location2}</td>
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
