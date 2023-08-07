import { selectOccTypeId } from '@/redux/occurrencies/occurrencies.selector'
import { getOccurrencesFetch } from '@/redux/occurrencies/slice'
import { RootState } from '@/redux/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useStoreOccurrence = () => {
	const dispatch = useDispatch()
	const filterActived = useSelector(selectOccTypeId)

	useEffect(() => {
		dispatch(getOccurrencesFetch())
	}, [dispatch])

	const { isLoading, occurrencies } = useSelector(
		(state: RootState) => state.occurrenceReducer,
	)

	return { isLoading, occurrencies, filterActived }
}
