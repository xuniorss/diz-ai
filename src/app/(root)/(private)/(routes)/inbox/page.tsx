'use client'

import { getWorkerOccurrenceFetch } from '@/redux/occurrencies/slice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function InboxPage() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getWorkerOccurrenceFetch())
	}, [dispatch])

	return <div></div>
}
