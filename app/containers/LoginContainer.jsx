import { connect } from 'react-redux'
import Login from '../components/Login'
import { login } from '../reducers/auth'

// map State To Props takes what is already on State
const mapStateToProps = (state) => ({ user: '' })

// Whatever function I put here, to update the state, I need to
// make sure the returned value of the state is above in
// map State To Props
const mapDispatchToProps = { login }
// we dispatch the dispatcher,
// which dispatches the action creator,
// which triggers the reducer
// which changes the state

export default connect(mapStateToProps, mapDispatchToProps)(Login)
