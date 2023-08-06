import { WorkersProps } from '@/models/user'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface WorkerState {
	worker: WorkersProps[] | null
	isLoading: boolean
	filter: string
}

const initialState: WorkerState = {
	isLoading: false,
	worker: null,
	filter: '',
}

const workerSlice = createSlice({
	name: 'worker',
	initialState,
	reducers: {
		getWorkersFetch: (state) => {
			state.isLoading = true
		},
		getWorkerSuccess: (state, action: PayloadAction<WorkersProps[]>) => {
			state.worker = [...action.payload]
			state.isLoading = false
		},
		getWorkerFailure: (state) => {
			state.isLoading = false
		},
		filterWorker: (state, action: PayloadAction<string>) => {
			state.isLoading = true
			state.filter = action.payload
			state.isLoading = false
		},
	},
})

export const {
	getWorkersFetch,
	getWorkerSuccess,
	getWorkerFailure,
	filterWorker,
} = workerSlice.actions

export default workerSlice.reducer
