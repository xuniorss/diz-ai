'use client'

import { Button } from '@/components/ui/button'
import { getOccurrencesFetch } from '@/redux/occurrencies/slice'
import axios from 'axios'
import { CheckCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

interface ButtonMarkAsReadProps {
	occId: string
}

export const ButtonMarkAsRead = ({ occId }: ButtonMarkAsReadProps) => {
	const [isMounted, setIsMounted] = useState(false)
	const [patching, setPatching] = useState(false)

	const router = useRouter()

	const dispatch = useDispatch()

	useEffect(() => setIsMounted(true), [])

	const handleMarkAsRead = useCallback(async () => {
		try {
			setPatching(true)

			await axios.patch(`/api/user/rh/occurrencies/${occId}`)
		} catch (error) {
			console.error(error)
		} finally {
			router.refresh()
			dispatch(getOccurrencesFetch())
			setPatching(false)
		}
	}, [dispatch, occId, router])

	if (!isMounted) return null

	return (
		<Button
			disabled={patching}
			className="w-full md:w-fit"
			onClick={handleMarkAsRead}
		>
			<CheckCheck className="mr-2 h-4 w-4" />
			Marcar como lido
		</Button>
	)
}
