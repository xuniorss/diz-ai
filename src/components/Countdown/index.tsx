'use client'

import { deleteKeysFetch, getKeysFetch } from '@/redux/keys/slice'
import { differenceInSeconds } from 'date-fns'
import { Timer } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export const Countdown = ({ expirationTime }: { expirationTime: Date }) => {
	const [timeRemaining, setTimeRemaining] = useState(0)
	const dispatch = useDispatch()

	useEffect(() => {
		const intervalId = setInterval(() => {
			const currentTime = new Date()
			const diffInSeconds = differenceInSeconds(
				new Date(expirationTime),
				currentTime,
			)

			setTimeRemaining(Math.max(0, diffInSeconds))
		}, 1000)

		return () => {
			clearInterval(intervalId)
		}
	}, [expirationTime])

	const formatCountdown = useCallback(
		(seconds: number) => {
			if (seconds <= 0) {
				dispatch(getKeysFetch())
				dispatch(deleteKeysFetch())
				return '00:00'
			}

			const minutes = Math.floor(seconds / 60)
			const remainingSeconds = seconds % 60
			return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
				.toString()
				.padStart(2, '0')}`
		},
		[dispatch],
	)

	return (
		<span className="flex items-center">
			<Timer className="mr-1.5 h-4 w-4" />
			<p className="text-sm">{formatCountdown(timeRemaining)}</p>
		</span>
	)
}
