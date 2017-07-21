import axios from 'axios'
import Promise from 'bluebird'
import { keyWU } from '../../envKeys'

const initialState = {
  currData: {}
}

// ------------ Weather Constants -----------
const GOT_CURRTEMP = 'GOT_CURRTEMP'

// ------------ Weather Dispatchers -----------
export const getCurrTemp = (param1, param2) =>
  dispatch =>
    Promise.all([
      axios.get(`http://api.wunderground.com/api/${keyWU}/conditions/q/${param1}.json`),
      axios.get(`http://api.wunderground.com/api/${keyWU}/conditions/q/${param2}.json`),
      axios.get(`http://api.wunderground.com/api/${keyWU}/hourly/q/${param1}.json`),
      axios.get(`http://api.wunderground.com/api/${keyWU}/hourly/q/${param2}.json`)
    ])
    .spread((weatherData1, weatherData2, hourly1, hourly2) => {
      let currData = {}

      if (weatherData1.data.response.error ||
        weatherData2.data.response.error ||
        hourly1.data.response.error ||
        hourly2.error) {
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
          windDir1: weatherData2.data.current_observation.wind_dir,
          windDir2: weatherData2.data.current_observation.wind_dir,
          icon1: weatherData2.data.current_observation.icon_url,
          icon2: weatherData2.data.current_observation.icon_url,
          hourly1: hourly1.data.hourly_forecast,
          hourly2: hourly2.data.hourly_forecast
        }
      }
      return dispatch(gotCurrTemp(currData))
    })
    .catch(err => console.error(err))

// ------------ Weather Action Creators -----------
// gotCurrTemp takes a current Temperature
// and triggers the currTemp reducer with action type GOT_CURRTEMP
export const gotCurrTemp = currData => ({
  type: GOT_CURRTEMP,
  currData
})

// ------------ Weather Reducers -----------
const reducer = (state=initialState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case GOT_CURRTEMP:
    newState.currData = action.currData
    break
  }
  return newState
}

export default reducer
