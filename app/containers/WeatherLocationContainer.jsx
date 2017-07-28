import { connect } from 'react-redux'
import WeatherLocation from 'APP/app/components/WeatherLocation'
import { getHourly } from '../reducers/weather'
import store from '../store'

// map State To Props takes what is already on State
const mapStateToProps = (state) =>
  ({
    hourlyData: state.weather.hourlyData,
    currData: state.weather.currData
  })

// Whatever function I put here, to update the state, I need to
// make sure the returned value of the state is above in
// map State To Props
const mapDispatchToProps = { getHourly }
// we dispatch the dispatcher,
// which dispatches the action creator,
// which triggers the reducer
// which changes the state

export default connect(mapStateToProps, mapDispatchToProps)(WeatherLocation)
