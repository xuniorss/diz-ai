import { OccurrenceResponseProps } from '@/models/occurrence'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface OccurrenciesState {
	occurrencies: OccurrenceResponseProps[] | null
	isLoading: boolean
}

const initialState: OccurrenciesState = {
	occurrencies: null,
	isLoading: false,
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
	},
})

export const {
	getOccurrencesFetch,
	getOccurrencesSuccess,
	getOccurrencesFailure,
} = occurrenciesSlice.actions

export default occurrenciesSlice.reducer
