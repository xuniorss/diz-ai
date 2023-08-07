import { RootState } from '../store'

export const selectOccTypeId = (state: RootState) =>
	state.occurrenceReducer.occurrenceTypeId

export const selectWorkerOccurrence = (state: RootState) =>
	state.occurrenceReducer.workerOccurrence

export const selectWorkerOccurrenceNotReadCount = (state: RootState) =>
	state.occurrenceReducer.workerOccurrence?.filter(
		(workOcc) => workOcc.read === false,
	).length
