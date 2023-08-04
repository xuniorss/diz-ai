'use client'

import { getUserFetch } from '@/redux/user/slice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function HomePage() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getUserFetch())
	}, [dispatch])

	return <div></div>
}
