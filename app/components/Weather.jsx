import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

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
      errorCityState2: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleGetWeather = this.handleGetWeather.bind(this)
  }

// create a function to call get Curr Temp reducer
  handleGetWeather = function(e) {
    e.preventDefault()
    let validZip = true
    let validCityState=true
    let param1, param2, error1, error2

    function validateZip(zip, group) {
      if (zip.match(/[0-9]/) && zip.length === 5) {
        return zip
      } else {
        return 'zip'
      }
    }

    function validateCityState(city, state, group) {
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
        // check if zip or city & state is entered
    debugger
    if (this.state.locations.zip1) {
      param1 = validateZip(this.state.locations.zip1)
    } else {
      param1 = validateCityState(this.state.locations.city1, this.state.locations.state1)
    }

    if (this.state.locations.zip2) {
      param2 = validateZip(this.state.locations.zip2)
    } else {
      param2 = validateCityState(this.state.locations.city2, this.state.locations.state2)
    }

    debugger
    if (param1 !== 'zip' && param1 !== 'citystate' &&
        param2 !== 'zip' && param2 !== 'citystate') {
      this.setState({errorZip1: false})
      this.setState({errorCityState1: false})
      this.setState({errorZip2: false})
      this.setState({errorCityState2: false})
      this.props.getCurrTemp(param1, param2)
      .then(() => {
        store.getState()
        browserHistory.push(`/weather/${param1}/${param2}`)
      })
    }

    if (param1 === 'zip') this.setState({errorZip1: true})
    else if (this.state.errorZip1 === true) this.setState({errorZip1: false})
    if (param1 === 'citystate') this.setState({errorCityState1: true})
    else if (this.state.errorCityState1 === true) this.setState({errorCityState1: false})
    if (param2 === 'zip') this.setState({errorZip2: true})
    else if (this.state.errorZip2 === true) this.setState({errorZip2: false})
    if (param2 === 'citystate') this.setState({errorCityState2: true})
    else if (this.state.errorCityState2 === true) this.setState({errorCityState2: false})
    // } else if (!validZip) {
    //   this.setState({errorZip: true})
    //   this.setState({errorCityState: false})
    // } else {
    //   this.setState({errorZip: false})
    //   this.setState({errorCityState: true})
    // }
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

          <div className="row" >
            <div className="col-lg-2" />
            <div className="col-lg-3">
              <h3 className="headers">First Location</h3>
            </div>
            <div className="col-lg-2" />
            <div className="col-lg-3">
              <h3 className="headers">Second Location</h3>
            </div>
            <div className="col-lg-2" />
          </div>

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
              <div className="col-lg-2" />
          </div>

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
              <div className="col-lg-2" />
          </div>

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
              <div className="col-lg-2" />
            </div>

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
