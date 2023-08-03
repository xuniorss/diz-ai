import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
	userTypeProfile: 'RH' | 'WORKER' | null
}

const initialState: UserState = {
	userTypeProfile: null,
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
	},
})

export const { setTypeProfile } = userSlice.actions

export default userSlice.reducer
