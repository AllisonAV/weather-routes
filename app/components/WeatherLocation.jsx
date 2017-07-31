
import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import firebase from 'APP/fire'
import store from '../store'
const auth = firebase.auth()
const db = firebase.database()

export default class WeatherLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      celsius: false,
      locationName: '',
      locationExists: false,
      showHourly1: false,
      showHourly2: false,
      showHourly3: false,
      showHourly4: false,
      hourly1: [],
      hourly2: [],
      hourly3: [],
      hourly4: []
    }

    this.changeUnits = this.changeUnits.bind(this)
    this.saveData = this.saveData.bind(this)
    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.showHourly = this.showHourly.bind(this)
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      locationName: e.target.value
    })
  }

  changeUnits = () => {
    this.setState({celsius: !this.state.celsius})
  }

  showModal = () => {
    if (auth && auth.currentUser && auth.currentUser.isAnonymous) {
      window.alert('You must be signed in to save data!')
    } else {
      document.getElementById('saveLocationModal').style.display = 'block'
    }
  }

  closeModal = () => {
    // reset input modal to empty
    this.refs.input.value = ''
    document.getElementById('saveLocationModal').style.display = 'none'
  }

  showHourly = (e) => {
    const whichWell = e.target.getAttribute('data-item')
    let param
    switch (whichWell) {
    case '1':
      param = this.props.routeParams.location1
      break
    case '2':
      param = this.props.routeParams.location2
      break
    case '3':
      param = this.props.routeParams.location3
      break
    case '4':
      param = this.props.routeParams.location4
      break
    }

    this.props.getHourly(param)
      .then(() => {
        store.getState()
      })
      .then(() => {
        switch (whichWell) {
        case '1':
          this.setState({hourly1: this.props.hourlyData.hourly})
          this.setState({showHourly1: true})
          break
        case '2':
          this.setState({hourly2: this.props.hourlyData.hourly})
          this.setState({showHourly2: true})
          break
        case '3':
          this.setState({hourly3: this.props.hourlyData.hourly})
          this.setState({showHourly3: true})
          break
        case '4':
          this.setState({hourly4: this.props.hourlyData.hourly})
          this.setState({showHourly4: true})
          break
        }
      })
  }
  
  saveData = () => {
    let route1, route2, route3, route4, loc1, loc2, loc3, loc4
    if (!this.props.params.location1) {
      route1 = 'empty'
      loc1 = 'empty'
    } else {
      route1 = this.props.params.location1
      loc1 = this.props.currData.location1
    }
    if (!this.props.params.location2) {
      route2 = 'empty'
      loc2 = 'empty'
    } else {
      route2 = this.props.params.location2
      loc2 = this.props.currData.location2
    }
    if (!this.props.params.location3) {
      route3 = 'empty'
      loc3 = 'empty'
    } else {
      route3 = this.props.params.location3
      loc3 = this.props.currData.location3
    }
    if (!this.props.params.location4) {
      route4 = 'empty'
      loc4 = 'empty'
    } else {
      route4 = this.props.params.location4
      loc4 = this.props.currData.location4
    }
    const locationsRef = db.ref('locations/' + auth.currentUser.uid + '/' + this.state.locationName)
    locationsRef.once('value')
      .then((snapshot) => {
        if (snapshot.val() === null) {
          const theParams = `${route1}|${route2}|${route3}|${route4}`
          locationsRef.set({
            routeParams: theParams,
            location1: loc1,
            location2: loc2,
            location3: loc3,
            location4: loc4
          })
          this.setState({locationExists: false})
          this.closeModal()
        } else {
          this.setState({locationExists: true})
        }
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
      <div className="modal modal-sm"
               id="saveLocationModal">
        <div className="modal-content ">
              <div className="modal-header">
                <button type="button"
                        className="close"
                        onClick={this.closeModal}
                        >&times;
                </button>
                <h4 className="modal-title">Save These Locations</h4>
              </div>
              <div className="modal-body">
                <input
                  ref="input"
                  type="text"
                  placeholder="name"
                  className="form-control"
                  onChange={ this.handleChange }
                  name="name"/>
                                {
              (this.state.locationExists)
              ?
                  <div className="alert alert-dismissible alert-danger">
                  <strong>Location exists.  Enter a different name</strong>
                  </div>
              : <div />
              }
              </div>
              <div className="modal-footer">
                <button type="button"
                        className="btn btn-default"
                        onClick={this.closeModal}>Close
                </button>
                <button type="button"
                        className="btn btn-primary"
                        onClick={this.saveData}>Save
                </button>
              </div>
          </div>
        </div>
        <div className="row">
          <div className="well well-sm col-lg-1">
            { this.state.celsius
            ? <button className="btn btn-primary well-buttons"
                      onClick={this.changeUnits} > Fahrenheit
              </button>
            : <button className="btn btn-primary well-buttons"
                      onClick={this.changeUnits} > Celsius
              </button> }
            <button className="btn btn-primary well-buttons"
                    onClick={this.showModal} > Save
            </button>
        </div>
{/* LOCATION 1 */}
          <div className="well col-lg-2">
            <table className="table table-striped table-hover">
            <thead>
              <tr className="info">
                <th colSpan='3'>{ this.props.currData.location1 } </th>
              </tr>
              <tr className="info">
                <th> <img src={this.props.currData.icon1}/></th>
                <th>
                  { this.state.celsius
                  ? <div>{ this.props.currData.currTempC1 }&#8451;</div>
                  : <div>{this.props.currData.currTemp1 } &#8457;</div>
                  }
                </th>
                <th />
              </tr>
            </thead>
              <tbody>
                { this.state.celsius
                  ? <tr>
                      <td colSpan='2'>Wind from {this.props.currData.windDir1}</td>
                      <td>{ this.props.currData.windKph1} KPH</td>
                    </tr>
                  : <tr>
                      <td colSpan='2'>Wind from {this.props.currData.windDir1}</td>
                      <td className="noRightPadding">{ this.props.currData.windMph1} MPH</td>
                    </tr>
                  }
                  <tr className="info">
                    <td colSpan='3'>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-item="1"
                        onClick={this.showHourly}>Next 8 hours
                      </button>
                    </td>
                  </tr>

               {
                this.state.showHourly1
                ?
                this.state.hourly1.map((hour, index) =>
                <tr key={index}>
                  { index<8
                  ?
                    <div>
                      <td>{hour.FCTTIME.civil}</td>
                      <td> <img src={hour.icon_url}/></td>
                      {this.state.celsius
                      ? <td> {hour.temp.metric}&#8451;</td>
                      : <td>{hour.temp.english}&#8457;</td>
                      }
                    </div>
                  :
                    <div />
                  }
                </tr>
                )
                :
                  <tr></tr>
              }
            </tbody>
          </table>
          </div>
{/* LOCATION 2 */}
          {this.props.currData.location2
          ?
          <div className="well col-lg-2">
            <table className="table table-striped table-hover ">
            <thead>
              <tr className="info">
                <th colSpan='3'>{ this.props.currData.location2 } </th>
              </tr>
              <tr className="info">
                <th> <img src={this.props.currData.icon2}/></th>
                <th>
                  { this.state.celsius
                  ? <div>{ this.props.currData.currTempC2 }&#8451;</div>
                  : <div>{this.props.currData.currTemp2 } &#8457;</div>
                  }
                </th>
                <th />
              </tr>
            </thead>
              <tbody>
                { this.state.celsius
                  ? <tr>
                      <td colSpan='2'>Wind from {this.props.currData.windDir2}</td>
                      <td>{ this.props.currData.windKph2} KPH</td>
                    </tr>
                  : <tr>
                      <td colSpan='2'>Wind from {this.props.currData.windDir2}</td>
                      <td className="noRightPadding">{this.props.currData.windMph2} MPH</td>
                    </tr>
                }
                <tr className="info">
                  <td colSpan='3'>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-item="2"
                      onClick={this.showHourly}>Next 8 hours
                    </button>
                  </td>
                </tr>
               {
                this.state.showHourly2
                ?
                this.state.hourly2.map((hour, index) =>
                <tr key={index}>
                  { index<8
                  ?
                    <div>
                      <td>{hour.FCTTIME.civil}</td>
                      <td> <img src={hour.icon_url}/></td>
                      {this.state.celsius
                      ? <td> {hour.temp.metric}&#8451;</td>
                      : <td>{hour.temp.english}&#8457;</td>
                      }
                    </div>
                  :
                    <div />
                  }
                </tr>
                )
                :
                  <tr></tr>
              }
              </tbody>
          </table>
          </div>
          :
            <div />
          }
{/* LOCATION 3 */}
          { this.props.currData.location3
          ?
          <div className="well col-lg-2">
            <table className="table table-striped table-hover ">
            <thead>
              <tr className="info">
                <th colSpan='3'>{ this.props.currData.location3 } </th>
              </tr>
              <tr className="info">
                <th> <img src={this.props.currData.icon3}/></th>
                <th>
                  { this.state.celsius
                  ? <div>{ this.props.currData.currTempC3 }&#8451;</div>
                  : <div>{this.props.currData.currTemp3 } &#8457;</div>
                  }
                </th>
                <th />
              </tr>
            </thead>
              <tbody>
                { this.state.celsius
                  ? <tr>
                      <td colSpan='2'>Wind from {this.props.currData.windDir3}</td>
                      <td>{ this.props.currData.windKph3} KPH</td>
                    </tr>
                  : <tr>
                      <td colSpan='2'>Wind from {this.props.currData.windDir3}</td>
                      <td className="noRightPadding">{this.props.currData.windMph3} MPH</td>
                    </tr>
                }
                <tr className="info">
                  <td colSpan='3'>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-item="3"
                      onClick={this.showHourly}>Next 8 hours
                    </button>
                  </td>
                </tr>

               {
                this.state.showHourly3
                ?
                this.state.hourly3.map((hour, index) =>
                <tr key={index}>
                  { index<8
                  ?
                    <div>
                      <td>{hour.FCTTIME.civil}</td>
                      <td> <img src={hour.icon_url}/></td>
                      {this.state.celsius
                      ? <td> {hour.temp.metric}&#8451;</td>
                      : <td>{hour.temp.english}&#8457;</td>
                      }
                    </div>
                  :
                    <div />
                  }
                </tr>
                )
                :
                  <tr></tr>
              }
              </tbody>
          </table>
          </div>
          :
            <div />
          }
{/* LOCATION 4 */}
          {this.props.currData.location4
          ?
          <div className="well col-lg-2">
            <table className="table table-striped table-hover ">
            <thead>
              <tr className="info">
                <th colSpan='3'>{ this.props.currData.location4 } </th>
              </tr>
              <tr className="info">
                <th> <img src={this.props.currData.icon4}/></th>
                <th>
                  { this.state.celsius
                  ? <div>{ this.props.currData.currTempC4 }&#8451;</div>
                  : <div>{this.props.currData.currTemp4 } &#8457;</div>
                  }
                </th>
                <th />
              </tr>
            </thead>
              <tbody>
                { this.state.celsius
                  ? <tr>
                      <td colSpan='2'>Wind from {this.props.currData.windDir4}</td>
                      <td>{ this.props.currData.windKph4} KPH</td>
                    </tr>
                  : <tr>
                      <td colSpan='2'>Wind from {this.props.currData.windDir4}</td>
                      <td className="noRightPadding">{this.props.currData.windMph4} MPH</td>
                    </tr> }
                    <tr className="info">
                    <td colSpan='3'>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-item="4"
                        onClick={this.showHourly}>Next 8 hours
                      </button>
                    </td>
                  </tr>

               {
                this.state.showHourly4
                ?
                this.state.hourly4.map((hour, index) =>
                <tr key={index}>
                  { index<8
                  ?
                    <div>
                      <td>{hour.FCTTIME.civil}</td>
                      <td> <img src={hour.icon_url}/></td>
                      {this.state.celsius
                      ? <td> {hour.temp.metric}&#8451;</td>
                      : <td>{hour.temp.english}&#8457;</td>
                      }
                    </div>
                  :
                    <div />
                  }
                </tr>
                )
                :
                  <tr></tr>
              }
              </tbody>
          </table>
          </div>
        :
          <div />
        }
        </div>
      </div>
    )
  }
}
