import { KeysProps } from '@/models/keys'
import axios from 'axios'
import { call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'

import {
	deleteKeysFailure,
	deleteKeysSuccess,
	deleteSingleKeyFailure,
	deleteSingleKeySuccess,
	getKeysFailure,
	getKeysSuccess,
	postKeysFailure,
	postKeysSuccess,
} from './slice'
import { KeysTypes } from './types'

const getKeys = () =>
	axios.get<KeysProps[]>('/api/user/key').then((response) => response.data)

const createKey = () => axios.post('/api/user/key')
const deleteKeysExpired = () => axios.delete('/api/user/key')
const deleteSingleKey = (keyId: string) =>
	axios.delete(`/api/user/key/${keyId}`)

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

function* workDeleteKeysFetch() {
	try {
		yield call(deleteKeysExpired)
		yield put(deleteKeysSuccess())
	} catch (error) {
		yield put(deleteKeysFailure())
	}
}

function* workDeleteSingleKeysFetch({
	type,
	payload,
}: {
	type: KeysTypes
	payload: string
}) {
	try {
		yield call(deleteSingleKey, payload)
		yield put(deleteSingleKeySuccess())
	} catch (error) {
		yield put(deleteSingleKeyFailure())
	}
}

function* keysSaga() {
	yield takeEvery(KeysTypes.KEYS_POST_FETCH, workPostKeyFetch)
	yield takeEvery(KeysTypes.KEYS_GET_FETCH, workGetKeysFetch)
	yield takeLatest(KeysTypes.KEYS_DELETE_FETCH, workDeleteKeysFetch)
	yield takeLatest(
		KeysTypes.KEYS_SINGLE_DELETE_FETCH,
		workDeleteSingleKeysFetch,
	)
}

export default fork(keysSaga)
