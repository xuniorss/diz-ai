import { RootState } from '../store'

export const selectHasTypeProfile = (state: RootState) =>
	state.userReducer.userTypeProfile !== null
