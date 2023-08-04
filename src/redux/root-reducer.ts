import { combineReducers } from 'redux'

import keysReducer from './keys/slice'
import stepReducer from './step/slice'
import userReducer from './user/slice'

const rootReducer = combineReducers({ userReducer, stepReducer, keysReducer })

export default rootReducer
