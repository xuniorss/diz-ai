import { WorkersProps } from '@/models/user'
import axios from 'axios'
import { call, fork, put, takeEvery } from 'redux-saga/effects'
import { getWorkerFailure, getWorkerSuccess } from './slice'
import { WorkersTypes } from './type'

const getWorkers = () =>
	axios.get<WorkersProps[]>('/api/user/worker').then((resp) => resp.data)

function* workGetWorkersFetch() {
	try {
		const workers: WorkersProps[] = yield call(getWorkers)
		yield put(getWorkerSuccess(workers))
	} catch (error) {
		yield put(getWorkerFailure())
	}
}

function* workerSaga() {
	yield takeEvery(WorkersTypes.WORKERS_GET_FETCH, workGetWorkersFetch)
}

export default fork(workerSaga)
