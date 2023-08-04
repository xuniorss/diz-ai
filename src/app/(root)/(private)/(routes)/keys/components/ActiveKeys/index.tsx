'use client'

import { useStoreKeys } from '@/hooks/useStoreKeys'
import { useStoreUser } from '@/hooks/useStoreUser'
import { getKeysFetch } from '@/redux/keys/slice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const ActiveKeys = () => {
	const { user } = useStoreUser()
	const { companyKeys } = useStoreKeys(user?.company[0].id)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getKeysFetch())
	}, [dispatch])

	return <div>{companyKeys?.map((key) => <p key={key.id}>{key.id}</p>)}</div>
}
