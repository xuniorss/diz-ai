import { RootState } from '../store'

export const selectOccTypeId = (state: RootState) =>
	state.occurrenceReducer.occurrenceTypeId
