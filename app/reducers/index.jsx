import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  // auth: require('./auth').default,
  weather: require('./weather').default
})

export default rootReducer
