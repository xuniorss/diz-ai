'use client'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useStoreOccurrence } from '@/hooks/useStoreOccurrence'
import {
	filterWorkerOccurrence,
	getWorkerOccurrenceFetch,
	resetFilterWorkerOccurrence,
} from '@/redux/occurrencies/slice'
import { ListFilter } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ButtonFilter } from '../ButtonFilter'

export const Filters = () => {
	const [isMounted, setIsMounted] = useState(false)

	const dispatch = useDispatch()

	const { occurrencies, filterActived, isLoading } = useStoreOccurrence()

	useEffect(() => {
		dispatch(getWorkerOccurrenceFetch())
		dispatch(resetFilterWorkerOccurrence())
	}, [dispatch])

	useEffect(() => setIsMounted(true), [])

	const handleFilter = useCallback(
		(occId: string) => {
			dispatch(filterWorkerOccurrence(occId))
		},
		[dispatch],
	)

	const handleResetFilter = useCallback(() => {
		dispatch(resetFilterWorkerOccurrence())
		dispatch(getWorkerOccurrenceFetch())
	}, [dispatch])

	if (!isMounted) return null

	return (
		<>
			<div className="hidden items-center justify-end gap-x-3 md:flex">
				<ButtonFilter
					onClick={handleResetFilter}
					size="sm"
					className="select-none"
					disabled={isLoading}
					bgColor={!filterActived ? 'active' : 'default'}
				>
					Todos
				</ButtonFilter>

				{occurrencies?.map((occ) => (
					<ButtonFilter
						key={occ.id}
						onClick={() => handleFilter(occ.id)}
						size="sm"
						className="select-none"
						disabled={isLoading}
						bgColor={filterActived === occ.id ? 'active' : 'default'}
					>
						{occ.name}
					</ButtonFilter>
				))}
			</div>
			<div className="z-30 flex flex-col md:hidden">
				<DropdownMenu>
					<DropdownMenuTrigger className="flex md:hidden" asChild>
						<Button
							variant="ghost"
							size="icon"
							aria-label="toggle button show filters"
						>
							<ListFilter className="h-5 w-5" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="flex w-fit flex-col md:hidden">
						<DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
						<DropdownMenuGroup>
							{occurrencies?.map((occ) => (
								<DropdownMenuItem key={occ.id} className="w-full">
									<Button
										size="sm"
										disabled={isLoading}
										onClick={() => handleFilter(occ.id)}
										className="w-full select-none"
										variant="outline"
									>
										{occ.name}
									</Button>
								</DropdownMenuItem>
							))}
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</>
	)
}
