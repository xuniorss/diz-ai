import { createSlice } from '@reduxjs/toolkit'

interface StepState {
	step: number
}

const initialState: StepState = {
	step: 0,
}

const stepSlice = createSlice({
	name: 'step',
	initialState,
	reducers: {
		onNext: (state) => {
			state.step = state.step + 1
		},
		onPrev: (state) => {
			state.step = state.step > 0 ? state.step - 1 : state.step
		},
		onReset: (state) => {
			state.step = 0
		},
	},
})

export const { onNext, onPrev, onReset } = stepSlice.actions

export default stepSlice.reducer
