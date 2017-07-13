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
      error: false,
      errorCityState: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleGetWeather = this.handleGetWeather.bind(this)
    this.removeSpacesFromCity = this.removeSpacesFromCity.bind(this)
  }

  removeSpacesFromCity = function(city) {
    return city.split(' ').join('_')
  }

// create a function to call get Curr Temp reducer
  handleGetWeather = function(e) {
    e.preventDefault()
    let validData = true
    let validCityState=true
    let param1, param2

        // check if zip or city & state is entered
    if (this.state.locations.zip1) {
      param1 = this.state.locations.zip1
    } else if (this.state.locations.city1 && this.state.locations.state1) {
      this.removeSpacesFromCity(this.state.locations.state1)
      param1 = `${this.state.locations.city1}_${this.state.locations.state1}`
    } else if ((this.state.locations.city1 && !this.state.locations.state1) ||
               (this.state.locations.state1 && !this.state.locations.city1)) {
      validCityState = false
    } else {
      validData = false
    }

    if (this.state.locations.zip2) {
      param2 = this.state.locations.zip2
    } else if (this.state.locations.city2 && this.state.locations.state2) {
      this.removeSpacesFromCity(this.state.locations.state1)
      param2 = `${this.state.locations.city2}_${this.state.locations.state2}`
    } else if ((this.state.locations.city2 && !this.state.locations.state2) ||
              (this.state.locations.state2 && !this.state.locations.city2)) {
      validCityState = false
    } else {
      validData = false
    }

    if (validData && validCityState) {
      this.setState({error: false})
      this.setState({errorCityState: false})
      console.log('function', this.props.getCurrTemp)
      this.props.getCurrTemp(param1, param2)
      .then(() => {
        store.getState()
        browserHistory.push(`/weather/${param1}/${param2}`)
      })
    } else if (!validData) {
      this.setState({error: true})
      this.setState({errorCityState: false})
    } else {
      this.setState({error: false})
      this.setState({errorCityState: true})
    }
  }

  handleChange = function(e) {
    e.preventDefault()
    this.setState({
      locations: { ...this.state.locations, [e.target.name]: e.target.value }
    })
  }

  render() {
    console.log('state in render', this.state)
    return (
      <div>
        <form id='location' className="form-horizontal">
        <h1>Weather Routes </h1>
          <fieldset>
            <legend>First Location</legend>
            <div className="form-group well weather-input">
              <div className="col-lg-4">
                <input type="text"
                        placeholder="zip code"
                        className="form-control"
                        onChange={ this.handleChange }
                        name="zip1"
                        pattern="[0-9]{5}"/>
              </div>
              <div className="col-lg-8" />
              <div className="col-lg-4">
                <input type="text"
                        placeholder="city"
                        className="form-control"
                        onChange={ this.handleChange }
                        name="city1"/>
              </div>
              <div className="col-lg-4">
                <select className="form-control"
                    placeholder="state"
                    onChange={ this.handleChange}
                    name="state1" >
                  <option value="" selected>state</option>
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
            <br />
            <legend>Second Location</legend>
            <div className="form-group well">
              <div className="col-lg-4">
                <input type="text"
                        placeholder="zip code"
                        className="form-control"
                        onChange={ this.handleChange }
                        name="zip2"/>
              </div>
              <div className="col-lg-4">
                <input type="text"
                        placeholder="city"
                        className="form-control"
                        onChange={ this.handleChange }
                        name="city2"/>
              </div>
              <div className="col-lg-4">
                <select className="form-control"
                    onChange={ this.handleChange}
                    name="state2" >
                  <option value="" selected>state</option>
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
            <hr />
            <button className="btn btn-primary"
                    type="submit"
                    form="location"
                    onClick={this.handleGetWeather}>Submit
            </button>
            <br />
            {
              this.state.error
              ? <div className="alert alert-dismissible alert-danger col-lg-2">
                  <strong> Enter Valid Data! </strong>
                </div>
              : this.state.errorCityState
                ? <div className="alert alert-dismissible alert-danger col-lg-3">
                  <strong> Enter Both City & State! </strong>
                </div>
                : <div />
            }
          </fieldset>
        </form>
      </div>
    )
  }
}
