import React, { Component } from 'React'
import firebase from 'APP/fire'
const auth = firebase.auth()
const db = firebase.database()

export default class SavedLocations extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }

    this.receiveData = this.receiveData.bind(this)
  }

  componentWillMount() {
    this.receiveData()
  }

  receiveData = () => {
    const ref = db.ref('locations/' + auth.currentUser.uid)
    ref.once('value')
    .then(snapshot => {
      this.setState({data: snapshot.val()})
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        {this.state.data && Object.keys(this.state.data).map(key => {
          return (
            <div key={key} className="location-container">

              <div>Location 1: {this.state.data[key].location1}</div>
              <div>Location 2:{this.state.data[key].location2}</div>
              <hr />
            </div>
          )
        })
        }
      </div>
    )
  }
}
