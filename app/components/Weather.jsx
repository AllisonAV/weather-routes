import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import firebase from 'APP/fire'
const auth = firebase.auth()
const db = firebase.database()

import store from '../store'

export default class Weather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: {
        zip1: '',
        zip2: '',
        city1: '',
        city2: '',
        state1: '',
        state2: ''
      },
      errorZip1: false,
      errorCityState1: false,
      errorZip2: false,
      errorCityState2: false,
      errorZip3: false,
      errorCityState3: false,
      errorZip4: false,
      errorCityState4: false 
      // waitToSendData: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleGetWeather = this.handleGetWeather.bind(this)
  }

// create a function to call get Curr Temp reducer
  handleGetWeather = function(e) {
    e.preventDefault()
    let params = []
    // let waitToSendData = false

    // const sendParmsToQueue = () => {
    //   debugger
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
    //       // if (snapshot.val().userId === auth.currentUser.uid) {
    //       //   console.log('in if', snapshot.val().key)
    //       //   this.props.getCurrTemp(snapshot.val().param1, snapshot.val().param2)
    //       //   .then(() => {
    //       //     store.getState()
    //       //     browserHistory.push(`/weather/${snapshot.val().param1}/${snapshot.val().param2}`)
    //       //   })
    //       // }
    //   })
    // }

    function validateZip(zip) {
      if (zip.match(/[0-9]/) && zip.length === 5) {
        return zip
      } else {
        return 'zip'
      }
    }

    function validateCityState(city, state) {
      if ((city && !state) || (state && !city)) {
        return 'citystate'
      } else {
        const city1 = removeSpacesFromCity(city)
        return `${city1}_${state}`
      }
    }

    function removeSpacesFromCity(city) {
      return city.split(' ').join('_')
    }

    // initialize parameter array
    params = []
        // check if zip or city & state is entered
    // input location 1
    if (this.state.locations.zip1) {
      params.push(validateZip(this.state.locations.zip1))
    } else if (this.state.locations.city1 || this.state.locations.state1) {
      params.push(validateCityState(this.state.locations.city1, this.state.locations.state1))
    }
    // input location 2
    if (this.state.locations.zip2) {
      params.push(validateZip(this.state.locations.zip2))
    } else if (this.state.locations.city2 || this.state.locations.state2) {
      params.push(validateCityState(this.state.locations.city2, this.state.locations.state2))
    }
    // input location 3
    if (this.state.locations.zip3) {
      params.push(validateZip(this.state.locations.zip3))
    } else if (this.state.locations.city3 || this.state.locations.state3) {
      params.push(validateCityState(this.state.locations.city3, this.state.locations.state3))
    }
    // input location 4
    if (this.state.locations.zip4) {
      params.push(validateZip(this.state.locations.zip4))
    } else if (this.state.locations.city4 || this.state.locations.state4) {
      params.push(validateCityState(this.state.locations.city4, this.state.locations.state4))
    }
    const index1 = params.findIndex(el => { if (el === 'zip') return false })
    const index2 = params.findIndex(el => { if (el === 'citystate') return false })
    if (index1 === -1 &&
        index2 === -1) {
      this.setState({errorZip1: false})
      this.setState({errorCityState1: false})
      this.setState({errorZip2: false})
      this.setState({errorCityState2: false})
      this.setState({errorZip3: false})
      this.setState({errorCityState3: false})
      this.setState({errorZip4: false})
      this.setState({errorCityState4: false})

      // if all 4 locations are not used, enter in placeholder data for unused parameters
      if (params.length === 1) params.push('empty')
      if (params.length === 2) params.push('empty')
      if (params.length === 3) params.push('empty')

      // create an entry in the apiQueue, which will be used
      // to ensure the key is not used more than 10 times a minute
      // sendParmsToQueue()
      // retreive the data from the queue, and get the weather
      // if (waitToSendData === false) {
      //   setTimeout(retrieveData, 5000)
      // } else {
      // reset waitToSendData so user can resubmit the form
      // use a local variable along with state, since setState is async
        // waitToSendData = false
        // this.setState({waitToSendData: false})
      this.props.getCurrTemp(params[0], params[1])
      .then(() => {
        store.getState()
        browserHistory.push(`/weather/${params[0]}/${params[1]}`)
      })
    }
      // comment out for test  ** Moved to retrieveData function
      // this.props.getCurrTemp(params[0], params[1])
      // .then(() => {
      //   store.getState()
      //   browserHistory.push(`/weather/${params[0]}/${params[1]}`)
      // })
// set state error flags for input 1
    if (params[0] === 'zip') this.setState({errorZip1: true})
    else if (this.state.errorZip1 === true) this.setState({errorZip1: false})
    if (params[0] === 'citystate') this.setState({errorCityState1: true})
    else if (this.state.errorCityState1 === true) this.setState({errorCityState1: false})
// set state error flags for input 2
    if (params[1] === 'zip') this.setState({errorZip2: true})
    else if (this.state.errorZip2 === true) this.setState({errorZip2: false})
    if (params[1] === 'citystate') this.setState({errorCityState2: true})
    else if (this.state.errorCityState2 === true) this.setState({errorCityState2: false})
// set state error flags for input 3
    if (params[2] === 'zip') this.setState({errorZip3: true})
    else if (this.state.errorZip3 === true) this.setState({errorZip3: false})
    if (params[2] === 'citystate') this.setState({errorCityState3: true})
    else if (this.state.errorCityState3 === true) this.setState({errorCityState3: false})
// set state error flags for input 4
    if (params[3] === 'zip') this.setState({errorZip4: true})
    else if (this.state.errorZip4 === true) this.setState({errorZip4: false})
    if (params[3] === 'citystate') this.setState({errorCityState4: true})
    else if (this.state.errorCityState4 === true) this.setState({errorCityState4: false})
  }

  handleChange = function(e) {
    e.preventDefault()
    this.setState({
      locations: { ...this.state.locations, [e.target.name]: e.target.value }
    })
  }

  render() {
    return (
      <div>
        <form id='location' className="form-horizontal" >
          <fieldset>
{/* location 1 & 2 headings */}
          <div className="row" >
            <div className="col-lg-2" />
            <div className="col-lg-3">
              <h3 className="headers">First Location</h3>
            </div>
            <div className="col-lg-2" />
            <div className="col-lg-3">
              <h3 className="headers">Second Location</h3>
            </div>
          </div>
{/* location 1 & 2 zip codes */}
          <div className="row" >
              <div className="col-lg-2" />
              <div className="col-lg-3">
                <input type="text"
                        placeholder="zip code"
                        className="form-control"
                        onChange={ this.handleChange }
                        name="zip1"/>
              </div>
              <div className="col-lg-2" />
              <div className="col-lg-3">
                <input type="text"
                        placeholder="zip code"
                        className="form-control"
                        onChange={ this.handleChange }
                        name="zip2"/>
              </div>
          </div>
{/* location 1 & 2 city */}
          <div className="row" >
              <div className="col-lg-2" />
              <div className="col-lg-3">
                <input type="text"
                        placeholder="city"
                        className="form-control"
                        onChange={ this.handleChange }
                        name="city1"/>
              </div>
              <div className="col-lg-2" />
              <div className="col-lg-3">
                <input type="text"
                        placeholder="city"
                        className="form-control"
                        onChange={ this.handleChange }
                        name="city2"/>
              </div>
          </div>
{/* location 1 & 2 state */}
          <div className="row" >
              <div className="col-lg-2" />
              <div className="col-lg-3">
                <select className="form-control"
                    placeholder="state"
                    onChange={ this.handleChange}
                    name="state1" >
                  <option value="" defaultValue>state</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="PR">Puerto Rico</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>
              <div className="col-lg-2" />
              <div className="col-lg-3">
                <select className="form-control"
                    onChange={ this.handleChange}
                    name="state2" >
                  <option value="" defaultValue>state</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="PR">Puerto Rico</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>
            </div>
{/* location 1 & 2 error boxes */}
            <div className="row" >
              <div className="col-lg-2" />
              <div className="col-lg-3">
              {
              (this.state.errorZip1)
              ?
                  <div className="alert alert-dismissible alert-danger">
                  <strong>Please Enter a Valid Zip Code</strong>
                  </div>
              : (this.state.errorCityState1)
                ?
                  <div className="alert alert-dismissible alert-danger">
                  <strong>Please Enter Both City and State</strong>
                  </div>
                :
                  <div />
              }
              </div>
              <div className="col-lg-2" />
              <div className="col-lg-3">
              {
              (this.state.errorZip2)
              ?
                  <div className="alert alert-dismissible alert-danger">
                  <strong>Please Enter a Valid Zip Code</strong>
                  </div>
              : (this.state.errorCityState2)
                ?
                  <div className="alert alert-dismissible alert-danger">
                  <strong>Please Enter Both City and State</strong>
                  </div>
                :
                  <div />
              }
              </div>
              <div className="col-lg-2" />
            </div>
            <br />
            <hr />
 {/* location 3 & 4 headings */}
          <div className="row" >
            <div className="col-lg-2" />
            <div className="col-lg-3">
              <h3 className="headers">Third Location</h3>
            </div>
            <div className="col-lg-2" />
            <div className="col-lg-3">
              <h3 className="headers">Fourth Location</h3>
            </div>
          </div>
{/* location 3 & 4 zip codes */}
          <div className="row" >
              <div className="col-lg-2" />
              <div className="col-lg-3">
                <input type="text"
                        placeholder="zip code"
                        className="form-control"
                        onChange={ this.handleChange }
                        name="zip3"/>
              </div>
              <div className="col-lg-2" />
              <div className="col-lg-3">
                <input type="text"
                        placeholder="zip code"
                        className="form-control"
                        onChange={ this.handleChange }
                        name="zip4"/>
              </div>
          </div>
{/* location 3 & 4 city */}
          <div className="row" >
              <div className="col-lg-2" />
              <div className="col-lg-3">
                <input type="text"
                        placeholder="city"
                        className="form-control"
                        onChange={ this.handleChange }
                        name="city3"/>
              </div>
              <div className="col-lg-2" />
              <div className="col-lg-3">
                <input type="text"
                        placeholder="city"
                        className="form-control"
                        onChange={ this.handleChange }
                        name="city4"/>
              </div>
          </div>
{/* location 3 & 4 state */}
          <div className="row" >
              <div className="col-lg-2" />
              <div className="col-lg-3">
                <select className="form-control"
                    placeholder="state"
                    onChange={ this.handleChange}
                    name="state3" >
                  <option value="" defaultValue>state</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="PR">Puerto Rico</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>
              <div className="col-lg-2" />
              <div className="col-lg-3">
                <select className="form-control"
                    onChange={ this.handleChange}
                    name="state4" >
                  <option value="" defaultValue>state</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="PR">Puerto Rico</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>
            </div>
{/* location 3 & 4 error boxes */}
            <div className="row" >
              <div className="col-lg-2" />
              <div className="col-lg-3">
              {
              (this.state.errorZip3)
              ?
                  <div className="alert alert-dismissible alert-danger">
                  <strong>Please Enter a Valid Zip Code</strong>
                  </div>
              : (this.state.errorCityState3)
                ?
                  <div className="alert alert-dismissible alert-danger">
                  <strong>Please Enter Both City and State</strong>
                  </div>
                :
                  <div />
              }
              </div>
              <div className="col-lg-2" />
              <div className="col-lg-3">
              {
              (this.state.errorZip4)
              ?
                  <div className="alert alert-dismissible alert-danger">
                  <strong>Please Enter a Valid Zip Code</strong>
                  </div>
              : (this.state.errorCityState4)
                ?
                  <div className="alert alert-dismissible alert-danger">
                  <strong>Please Enter Both City and State</strong>
                  </div>
                :
                  <div />
              }
              </div>
              <div className="col-lg-2" />
            </div>
            <br />
            <button className="btn btn-primary btn-center"
                    type="submit"
                    form="location"
                    onClick={this.handleGetWeather}>Get Weather</button>
            <br />
          </fieldset>
        </form>
      </div>
    )
  }
}
