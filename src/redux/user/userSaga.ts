import { UserResponse } from '@/models/user'
import axios from 'axios'
import { call, fork, put, takeEvery } from 'redux-saga/effects'
import { getUserFailure, getUserSuccess } from './slice'
import { UserTypes } from './types'

const getUser = () =>
	axios.get<UserResponse>('/api/user').then((response) => response.data)

function* workGetUserFetch() {
	try {
		const data: UserResponse = yield call(getUser)
		yield put(getUserSuccess(data))
	} catch (error) {
		yield put(getUserFailure())
	}
}

function* userSaga() {
	yield takeEvery(UserTypes.USER_FETCH, workGetUserFetch)
}

export default fork(userSaga)
