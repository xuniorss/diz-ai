import { KeysProps } from '@/models/keys'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface KeysState {
	keys: KeysProps[] | null
	isLoading: boolean
	keyId: string | null
}

const initialState: KeysState = {
	keys: null,
	isLoading: false,
	keyId: null,
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
		deleteKeysFetch: (state) => {
			state.isLoading = true
		},
		deleteKeysSuccess: (state) => {
			state.isLoading = false
		},
		deleteKeysFailure: (state) => {
			state.isLoading = false
		},
		deleteSingleKeyFetch: (state, action: PayloadAction<string>) => {
			state.keyId = action.payload
			state.isLoading = true
		},
		deleteSingleKeySuccess: (state) => {
			const keysUpdated = state.keys?.filter(
				(key) => key.id !== state.keyId,
			) as KeysProps[]

			state.keys = [...keysUpdated]
			state.keyId = null
			state.isLoading = false
		},
		deleteSingleKeyFailure: (state) => {
			state.keyId = null
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
	deleteKeysFetch,
	deleteKeysSuccess,
	deleteKeysFailure,
	deleteSingleKeyFetch,
	deleteSingleKeySuccess,
	deleteSingleKeyFailure,
} = keysSlice.actions

export default keysSlice.reducer
