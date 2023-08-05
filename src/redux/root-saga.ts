import { all } from 'redux-saga/effects'
import keysSaga from './keys/keysSaga'
import occurrenceSaga from './occurrencies/occurrenceSaga'
import userSaga from './user/userSaga'

export default function* rootSaga() {
	yield all([userSaga, keysSaga, occurrenceSaga])
}
