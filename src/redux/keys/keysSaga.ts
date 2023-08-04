import { KeysProps } from '@/models/keys'
import axios from 'axios'
import { call, fork, put, takeEvery } from 'redux-saga/effects'
import {
	getKeysFailure,
	getKeysSuccess,
	postKeysFailure,
	postKeysSuccess,
} from './slice'
import { KeysTypes } from './types'

const getKeys = () =>
	axios.get<KeysProps[]>('/api/user/key').then((response) => response.data)

const createKey = () => axios.post('/api/user/key')

function* workPostKeyFetch() {
	try {
		yield call(createKey)
		yield put(postKeysSuccess())
	} catch (error) {
		yield put(postKeysFailure())
	}
}

function* workGetKeysFetch() {
	try {
		const keys: KeysProps[] = yield call(getKeys)
		yield put(getKeysSuccess(keys))
	} catch (error) {
		yield put(getKeysFailure())
	}
}

function* keysSaga() {
	yield takeEvery(KeysTypes.KEYS_POST_FETCH, workPostKeyFetch)
	yield takeEvery(KeysTypes.KEYS_GET_FETCH, workGetKeysFetch)
}

export default fork(keysSaga)
