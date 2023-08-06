'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useStoreWorkers } from '@/hooks/useStoreWorkers'
import { filterWorker } from '@/redux/worker/slice'
import { Users } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export const SearchWorker = () => {
	const [filter, setFilter] = useState('')
	const [isMounted, setIsMounted] = useState(false)

	const { toast } = useToast()

	const { workers, filterStore } = useStoreWorkers()
	const dispatch = useDispatch()

	useEffect(() => setIsMounted(true), [])

	const onClear = useCallback(() => {
		dispatch(filterWorker(''))
		setFilter('')
	}, [dispatch])

	const onFilter = useCallback(() => {
		if (filter.length <= 3)
			return toast({ title: 'Digite mais de 3 caracteres.' })

		dispatch(filterWorker(filter))
	}, [dispatch, filter, toast])

	if (!isMounted) return null

	return (
		<div className="flex w-full items-center justify-between space-x-4">
			<span className="flex items-center">
				<Users className="mr-2 h-5 w-5" />
				<p>{workers?.length}</p>
			</span>
			<section className="flex flex-1 items-center gap-x-3">
				<Input
					className="bg-background"
					placeholder="Busque por email ou nome do seu colaborador"
					min={3}
					onChange={(e) => setFilter(e.target.value)}
					value={filter}
				/>
				<div className="flex items-center gap-x-2">
					<Button
						onClick={onFilter}
						type="button"
						aria-label="button search worker"
						size="sm"
					>
						Buscar
					</Button>
					{filter.length > 3 && filterStore.length > 3 && (
						<Button
							onClick={onClear}
							type="button"
							aria-label="button search worker"
							size="sm"
							variant="secondary"
						>
							Limpar
						</Button>
					)}
				</div>
			</section>
		</div>
	)
}
