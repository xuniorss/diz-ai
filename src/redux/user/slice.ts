import { UserResponse } from '@/models/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
	userTypeProfile: 'RH' | 'WORKER' | null
	user: UserResponse | null
	isLoading: boolean
}

const initialState: UserState = {
	userTypeProfile: null,
	user: null,
	isLoading: false,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setTypeProfile: (
			state,
			action: PayloadAction<'RH' | 'WORKER' | null>,
		) => {
			state.userTypeProfile = action.payload
		},
		getUserFetch: (state) => {
			state.isLoading = true
		},
		getUserSuccess: (state, action: PayloadAction<UserResponse>) => {
			state.user = action.payload
			state.isLoading = false
		},
		getUserFailure: (state) => {
			state.isLoading = false
			state.user = null
		},
		clearUser: (state) => {
			state.user = null
		},
	},
})

export const {
	setTypeProfile,
	getUserFetch,
	getUserSuccess,
	getUserFailure,
	clearUser,
} = userSlice.actions

export default userSlice.reducer
