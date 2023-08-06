import { OccurrenceResponseProps } from '@/models/occurrence'
import { Occurrencies } from '@prisma/client'
import axios from 'axios'
import { call, fork, put, takeEvery } from 'redux-saga/effects'

import {
	getOccurrencesFailure,
	getOccurrencesSuccess,
	getWorkerOccurrenceFailure,
	getWorkerOccurrenceSuccess,
} from './slice'
import { OccurrenceTypes } from './type'

const getOccurrences = () =>
	axios
		.get<OccurrenceResponseProps[]>('/api/occurrencies')
		.then((response) => response.data)

const getWorkerOccurrences = () =>
	axios
		.get<Occurrencies[]>('/api/user/worker/occurrencies')
		.then((response) => response.data)

function* workGetOccurrenceFetch() {
	try {
		const occurrences: OccurrenceResponseProps[] = yield call(getOccurrences)
		yield put(getOccurrencesSuccess(occurrences))
	} catch (error) {
		yield put(getOccurrencesFailure())
	}
}

function* workGetWorkerOccurrencesFetch() {
	try {
		const workerOccurrence: Occurrencies[] = yield call(getWorkerOccurrences)
		yield put(getWorkerOccurrenceSuccess(workerOccurrence))
	} catch (error) {
		yield put(getWorkerOccurrenceFailure())
	}
}

function* occurrenceSaga() {
	yield takeEvery(OccurrenceTypes.OCCURRENCE_GET_FETCH, workGetOccurrenceFetch)
	yield takeEvery(
		OccurrenceTypes.OCCURRENCE_WORKER_GET_FETCH,
		workGetWorkerOccurrencesFetch,
	)
}

export default fork(occurrenceSaga)
