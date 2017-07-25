import React, { Component } from 'React'
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
    this.retrieveData = this.retrieveData.bind(this)
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

  retrieveData = (e) => {
    let params = []
    console.log('LOGGING e', e)
    // this.props.getCurrTemp(params[0], params[1])
    // .then(() => {
    //   store.getState()
    //   browserHistory.push(`/weather/${params[0]}/${params[1]}`)
    // })
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
            <tr key={key} className='well-sm'>
              <td>
                <button
                  className="btn btn-primary"
                  type="button"
                  id={key}
                  onClick={this.retrieveData}>Weather
                </button>
              </td>
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
