import axios from 'axios'
import Promise from 'bluebird'
import { keyWU } from '../../envKeys'

const initialState = {
  currData: {}
}

// ------------ Weather Constants -----------
const GOT_CURRTEMP = 'GOT_CURRTEMP'
const GOT_HOURLY = 'GOT_HOURLY'

// ------------ Weather Dispatchers -----------
export const getCurrTemp1 = (params) =>
  dispatch =>
    axios.get(`https://api.wunderground.com/api/${keyWU}/conditions/q/${params[0]}.json`)
    .then((weatherData1) => {
      let currData = {}
      if (weatherData1.data.response.error) {
        currData = {error: 'Invalid Location'}
      } else {
        currData = {
          currTemp1: weatherData1.data.current_observation.temp_f,
          currTempC1: weatherData1.data.current_observation.temp_c,
          windMph1: weatherData1.data.current_observation.wind_mph,
          windKph1: weatherData1.data.current_observation.wind_mph,
          location1: weatherData1.data.current_observation.display_location.full,
          weather1: weatherData1.data.current_observation.weather,
          windDir1: weatherData1.data.current_observation.wind_dir,
          icon1: weatherData1.data.current_observation.icon_url,
        }
      }
      return dispatch(gotCurrTemp(currData))
    })
    .catch(err => console.error(err))

export const getCurrTemp2 = (params) =>
  dispatch =>
      Promise.all([
        axios.get(`http://api.wunderground.com/api/${keyWU}/conditions/q/${params[0]}.json`),
        axios.get(`http://api.wunderground.com/api/${keyWU}/conditions/q/${params[1]}.json`),
      ])
    .spread((weatherData1, weatherData2) => {
      let currData = {}
      if (weatherData1.data.response.error ||
          weatherData2.data.response.error) {
        currData = {error: 'Invalid Location'}
      } else {
        currData = {
          currTemp1: weatherData1.data.current_observation.temp_f,
          currTemp2: weatherData2.data.current_observation.temp_f,
          currTempC1: weatherData1.data.current_observation.temp_c,
          currTempC2: weatherData2.data.current_observation.temp_c,
          windMph1: weatherData1.data.current_observation.wind_mph,
          windMph2: weatherData2.data.current_observation.wind_mph,
          windKph1: weatherData1.data.current_observation.wind_mph,
          windKph2: weatherData2.data.current_observation.wind_mph,
          location1: weatherData1.data.current_observation.display_location.full,
          location2: weatherData2.data.current_observation.display_location.full,
          weather1: weatherData1.data.current_observation.weather,
          weather2: weatherData2.data.current_observation.weather,
          windDir1: weatherData1.data.current_observation.wind_dir,
          windDir2: weatherData2.data.current_observation.wind_dir,
          icon1: weatherData1.data.current_observation.icon_url,
          icon2: weatherData2.data.current_observation.icon_url
        }
      }
      return dispatch(gotCurrTemp(currData))
    })
    .catch(err => console.error(err))

export const getCurrTemp3 = (params) =>
  dispatch =>
      Promise.all([
        axios.get(`http://api.wunderground.com/api/${keyWU}/conditions/q/${params[0]}.json`),
        axios.get(`http://api.wunderground.com/api/${keyWU}/conditions/q/${params[1]}.json`),
        axios.get(`http://api.wunderground.com/api/${keyWU}/conditions/q/${params[2]}.json`),
      ])
    .spread((weatherData1, weatherData2, weatherData3) => {
      let currData = {}
      if (weatherData1.data.response.error ||
          weatherData2.data.response.error ||
          weatherData3.data.response.error) {
        currData = {error: 'Invalid Location'}
      } else {
        currData = {
          currTemp1: weatherData1.data.current_observation.temp_f,
          currTemp2: weatherData2.data.current_observation.temp_f,
          currTemp3: weatherData3.data.current_observation.temp_f,
          currTempC1: weatherData1.data.current_observation.temp_c,
          currTempC2: weatherData2.data.current_observation.temp_c,
          currTempC3: weatherData3.data.current_observation.temp_c,
          windMph1: weatherData1.data.current_observation.wind_mph,
          windMph2: weatherData2.data.current_observation.wind_mph,
          windMph3: weatherData3.data.current_observation.wind_mph,
          windKph1: weatherData1.data.current_observation.wind_mph,
          windKph2: weatherData2.data.current_observation.wind_mph,
          windKph3: weatherData3.data.current_observation.wind_mph,
          location1: weatherData1.data.current_observation.display_location.full,
          location2: weatherData2.data.current_observation.display_location.full,
          location3: weatherData3.data.current_observation.display_location.full,
          weather1: weatherData1.data.current_observation.weather,
          weather2: weatherData2.data.current_observation.weather,
          weather3: weatherData3.data.current_observation.weather,
          windDir1: weatherData1.data.current_observation.wind_dir,
          windDir2: weatherData2.data.current_observation.wind_dir,
          windDir3: weatherData3.data.current_observation.wind_dir,
          icon1: weatherData1.data.current_observation.icon_url,
          icon2: weatherData2.data.current_observation.icon_url,
          icon3: weatherData3.data.current_observation.icon_url
        }
      }
      return dispatch(gotCurrTemp(currData))
    })
    .catch(err => console.error(err))

export const getCurrTemp4 = (params) =>
  dispatch =>
      Promise.all([
        axios.get(`http://api.wunderground.com/api/${keyWU}/conditions/q/${params[0]}.json`),
        axios.get(`http://api.wunderground.com/api/${keyWU}/conditions/q/${params[1]}.json`),
        axios.get(`http://api.wunderground.com/api/${keyWU}/conditions/q/${params[2]}.json`),
        axios.get(`http://api.wunderground.com/api/${keyWU}/conditions/q/${params[3]}.json`),
      ])
    .spread((weatherData1, weatherData2, weatherData3, weatherData4) => {
      let currData = {}
      if (weatherData1.data.response.error ||
          weatherData2.data.response.error ||
          weatherData3.data.response.error ||
          weatherData4.data.response.error) {
        currData = {error: 'Invalid Location'}
      } else {
        currData = {
          currTemp1: weatherData1.data.current_observation.temp_f,
          currTemp2: weatherData2.data.current_observation.temp_f,
          currTemp3: weatherData3.data.current_observation.temp_f,
          currTemp4: weatherData4.data.current_observation.temp_f,
          currTempC1: weatherData1.data.current_observation.temp_c,
          currTempC2: weatherData2.data.current_observation.temp_c,
          currTempC3: weatherData3.data.current_observation.temp_c,
          currTempC4: weatherData4.data.current_observation.temp_c,
          windMph1: weatherData1.data.current_observation.wind_mph,
          windMph2: weatherData2.data.current_observation.wind_mph,
          windMph3: weatherData3.data.current_observation.wind_mph,
          windMph4: weatherData4.data.current_observation.wind_mph,
          windKph1: weatherData1.data.current_observation.wind_mph,
          windKph2: weatherData2.data.current_observation.wind_mph,
          windKph3: weatherData3.data.current_observation.wind_mph,
          windKph4: weatherData4.data.current_observation.wind_mph,
          location1: weatherData1.data.current_observation.display_location.full,
          location2: weatherData2.data.current_observation.display_location.full,
          location3: weatherData3.data.current_observation.display_location.full,
          location4: weatherData4.data.current_observation.display_location.full,
          weather1: weatherData1.data.current_observation.weather,
          weather2: weatherData2.data.current_observation.weather,
          weather3: weatherData3.data.current_observation.weather,
          weather4: weatherData4.data.current_observation.weather,
          windDir1: weatherData1.data.current_observation.wind_dir,
          windDir2: weatherData2.data.current_observation.wind_dir,
          windDir3: weatherData3.data.current_observation.wind_dir,
          windDir4: weatherData4.data.current_observation.wind_dir,
          icon1: weatherData1.data.current_observation.icon_url,
          icon2: weatherData2.data.current_observation.icon_url,
          icon3: weatherData3.data.current_observation.icon_url,
          icon4: weatherData4.data.current_observation.icon_url
        }
      }
      return dispatch(gotCurrTemp(currData))
    })
    .catch(err => console.error(err))

export const getHourly = (param) =>
  dispatch =>
    axios.get(`http://api.wunderground.com/api/${keyWU}/hourly/q/${param}.json`)
    .then((weatherData) => {
      let hourlyData = {}
      if (weatherData.data.response.error) {
        hourlyData = {error: 'Invalid Location'}
      } else {
        hourlyData = {
          hourly: weatherData.data.hourly_forecast
        }
      }
      return dispatch(gotHourly(hourlyData))
    })
    .catch(err => console.error(err))

// ------------ Weather Action Creators -----------
// gotCurrTemp takes a current Temperature
// and triggers the currTemp reducer with action type GOT_CURRTEMP
export const gotCurrTemp = currData => ({
  type: GOT_CURRTEMP,
  currData
})

export const gotHourly = hourlyData => ({
  type: GOT_HOURLY,
  hourlyData
})

// ------------ Weather Reducers -----------
const reducer = (state=initialState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case GOT_CURRTEMP:
    newState.currData = action.currData
    break
  case GOT_HOURLY:
    newState.hourlyData = action.hourlyData
    break
  }
  return newState
}

export default reducer
