import { RootState } from '../store'

export const selectCurrentStep = (state: RootState) => state.stepReducer.step
