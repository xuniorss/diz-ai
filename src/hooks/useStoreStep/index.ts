import { selectCurrentStep } from '@/redux/step/step.selector'
import { useSelector } from 'react-redux'

export const useStoreStep = () => {
	const currentStep = useSelector(selectCurrentStep)

	return { currentStep }
}
