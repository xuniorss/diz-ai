import { OccurrenceResponseProps } from '@/models/occurrence'
import { Occurrencies } from '@prisma/client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface OccurrenciesState {
	occurrencies: OccurrenceResponseProps[] | null
	isLoading: boolean
	workerOccurrence: Occurrencies[] | null
}

const initialState: OccurrenciesState = {
	occurrencies: null,
	isLoading: false,
	workerOccurrence: null,
}

const occurrenciesSlice = createSlice({
	name: 'occurrencies',
	initialState,
	reducers: {
		getOccurrencesFetch: (state) => {
			state.isLoading = true
		},
		getOccurrencesSuccess: (
			state,
			action: PayloadAction<OccurrenceResponseProps[]>,
		) => {
			state.occurrencies = [...action.payload]
			state.isLoading = false
		},
		getOccurrencesFailure: (state) => {
			state.isLoading = false
		},
		getWorkerOccurrenceFetch: (state) => {
			state.isLoading = true
		},
		getWorkerOccurrenceSuccess: (
			state,
			action: PayloadAction<Occurrencies[]>,
		) => {
			state.workerOccurrence = [...action.payload]
			state.isLoading = false
		},
		getWorkerOccurrenceFailure: (state) => {
			state.isLoading = false
		},
	},
})

export const {
	getOccurrencesFetch,
	getOccurrencesSuccess,
	getOccurrencesFailure,
	getWorkerOccurrenceFetch,
	getWorkerOccurrenceSuccess,
	getWorkerOccurrenceFailure,
} = occurrenciesSlice.actions

export default occurrenciesSlice.reducer
