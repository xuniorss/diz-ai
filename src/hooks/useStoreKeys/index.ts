import {
	selectKeyByCompany,
	selectKeysIsLoading,
} from '@/redux/keys/keys.selector'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export const useStoreKeys = (companyId?: string) => {
	const isFetching = useSelector(selectKeysIsLoading)
	const keys = useSelector(selectKeyByCompany)

	const companyKeys = useMemo(() => {
		if (!keys) return null

		return keys.filter((key) => key.companyId === companyId)
	}, [companyId, keys])

	return { isFetching, companyKeys, keys }
}
