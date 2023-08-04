import { RootState } from '../store'

export const selectKeysIsLoading = (state: RootState) =>
	state.keysReducer.isLoading

export const selectKeyByCompany = (state: RootState) => state.keysReducer.keys
