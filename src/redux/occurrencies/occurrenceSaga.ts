import { OccurrenceResponseProps } from '@/models/occurrence'
import axios from 'axios'
import { call, fork, put, takeEvery } from 'redux-saga/effects'
import { getOccurrencesFailure, getOccurrencesSuccess } from './slice'
import { OccurrenceTypes } from './type'

const getOccurrences = () =>
	axios
		.get<OccurrenceResponseProps[]>('/api/occurrencies')
		.then((response) => response.data)

function* workGetOccurrenceFetch() {
	try {
		const occurrences: OccurrenceResponseProps[] = yield call(getOccurrences)
		yield put(getOccurrencesSuccess(occurrences))
	} catch (error) {
		yield put(getOccurrencesFailure())
	}
}

function* occurrenceSaga() {
	yield takeEvery(OccurrenceTypes.OCCURRENCE_GET_FETCH, workGetOccurrenceFetch)
}

export default fork(occurrenceSaga)
