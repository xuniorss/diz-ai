'use client'

import { Countdown } from '@/components/Countdown'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useStoreKeys } from '@/hooks/useStoreKeys'
import { useStoreUser } from '@/hooks/useStoreUser'
import { deleteKeysFetch, getKeysFetch } from '@/redux/keys/slice'
import { ClipboardCopy } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const ActiveKeys = () => {
	const { user } = useStoreUser()
	const { companyKeys } = useStoreKeys(user?.company[0].id)
	const { toast } = useToast()

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getKeysFetch())
		dispatch(deleteKeysFetch())
	}, [dispatch])

	const handleCopyKey = useCallback(
		(key: string) => {
			if (!navigator.clipboard || !key) return

			navigator.clipboard.writeText(key)

			toast({ description: 'Chave copiada para área de transferência.' })
		},
		[toast],
	)

	return (
		<section className="space-y-3">
			{companyKeys?.map((key) => (
				<div
					key={key.id}
					className="flex items-center justify-between rounded-md bg-primary-foreground p-3 hover:shadow"
				>
					<p>{key.id}</p>
					<div className="flex items-center space-x-3">
						<Countdown expirationTime={key.expirationTime} />
						<Button
							aria-label="button copy key"
							size="icon"
							variant="ghost"
							onClick={() => handleCopyKey(key.id)}
						>
							<ClipboardCopy className="h-5 w-5" />
						</Button>
					</div>
				</div>
			))}
		</section>
	)
}
