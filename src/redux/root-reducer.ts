import { combineReducers } from 'redux'

import stepReducer from './step/slice'
import userReducer from './user/slice'

const rootReducer = combineReducers({ userReducer, stepReducer })

export default rootReducer
