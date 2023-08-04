'use client'

import { Button } from '@/components/ui/button'
import { useStoreKeys } from '@/hooks/useStoreKeys'
import { getKeysFetch, postKeysFetch } from '@/redux/keys/slice'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export const GenerateKey = () => {
	const [isMounted, setIsMounted] = useState(false)
	const { isFetching } = useStoreKeys()
	const router = useRouter()

	const dispatch = useDispatch()

	useEffect(() => setIsMounted(true), [])

	const handleGenerate = useCallback(() => {
		dispatch(postKeysFetch())
		dispatch(getKeysFetch())

		router.refresh()
	}, [dispatch, router])

	if (!isMounted) return null

	return (
		<div className="flex w-full items-center">
			<Button
				aria-label="generate key access"
				disabled={isFetching}
				onClick={handleGenerate}
			>
				<Plus className="mr-2 h-4 w-4" />
				Gerar nova chave
			</Button>
		</div>
	)
}
