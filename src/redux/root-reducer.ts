import { combineReducers } from 'redux'

import keysReducer from './keys/slice'
import occurrenceReducer from './occurrencies/slice'
import stepReducer from './step/slice'
import userReducer from './user/slice'
import workersReducer from './worker/slice'

const rootReducer = combineReducers({
	userReducer,
	stepReducer,
	keysReducer,
	occurrenceReducer,
	workersReducer,
})

export default rootReducer
