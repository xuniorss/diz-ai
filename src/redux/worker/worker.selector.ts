import { RootState } from '../store'

export const selectWorkers = (state: RootState) => state.workersReducer.worker

export const selectFilterWorker = (state: RootState) =>
	state.workersReducer.filter
