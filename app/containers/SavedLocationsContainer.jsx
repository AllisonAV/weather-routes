import { connect } from 'react-redux'
import SavedLocations from '../components/SavedLocations'
import { getCurrTemp1, getCurrTemp2, getCurrTemp3, getCurrTemp4 } from '../reducers/weather'

// map State To Props takes what is already on State
const mapStateToProps = (state) => ({ currData: state.weather.currData })

// Whatever function I put here, to update the state, I need to
// make sure the returned value of the state is above in
// map State To Props
const mapDispatchToProps = { getCurrTemp1, getCurrTemp2, getCurrTemp3, getCurrTemp4 }
// we dispatch the dispatcher,
// which dispatches the action creator,
// which triggers the reducer
// which changes the state

export default connect(mapStateToProps, mapDispatchToProps)(SavedLocations)
