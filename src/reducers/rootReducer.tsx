import { combineReducers } from 'redux'
import personDebugReducer from './DebugReducer'
import personCreateReducer from './CreateReducer'
import personDeleteReducer from './DeleteReducer'
import personUpdateReducer from './UpdateReducer'
import personOneReducer from './getOneReducer'

const rootReducer = combineReducers({
  personDebug: personDebugReducer,
  personCreate: personCreateReducer,
  personDelete: personDeleteReducer,
  personUpdate: personUpdateReducer,
  personOne: personOneReducer
})

export default rootReducer