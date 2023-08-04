import { KeysProps } from '@/models/keys'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface KeysState {
	keys: KeysProps[] | null
	isLoading: boolean
}

const initialState: KeysState = {
	keys: null,
	isLoading: false,
}

const keysSlice = createSlice({
	name: 'keys',
	initialState,
	reducers: {
		postKeysFetch: (state) => {
			state.isLoading = true
		},
		postKeysSuccess: (state) => {
			state.isLoading = false
		},
		postKeysFailure: (state) => {
			state.isLoading = false
		},
		getKeysFetch: (state) => {
			state.isLoading = true
		},
		getKeysSuccess: (state, action: PayloadAction<KeysProps[]>) => {
			state.keys = [...action.payload]
			state.isLoading = false
		},
		getKeysFailure: (state) => {
			state.isLoading = false
		},
	},
})

export const {
	postKeysFetch,
	postKeysSuccess,
	postKeysFailure,
	getKeysFetch,
	getKeysSuccess,
	getKeysFailure,
} = keysSlice.actions

export default keysSlice.reducer
