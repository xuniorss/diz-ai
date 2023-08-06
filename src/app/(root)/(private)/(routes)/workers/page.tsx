'use client'

import { HeaderPages } from '@/components/HeaderPages'
import { Separator } from '@/components/ui/separator'

import { getWorkersFetch } from '@/redux/worker/slice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SearchWorker } from './components/SearchWorker'
import { WorkerList } from './components/WorkerList'

export default function WorkersPage() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getWorkersFetch())
	}, [dispatch])

	return (
		<article className="flex h-full justify-center">
			<section className="my-5 w-full max-w-screen-lg space-y-4">
				<HeaderPages title="Listagem de colaboradores da empresa" />
				<Separator className="bg-primary/30" />
				<section>
					<SearchWorker />
				</section>
				<div className="flex flex-col py-4">
					<section className="max-h-[75vh] overflow-y-auto scrollbar-none">
						<WorkerList />
					</section>
				</div>
			</section>
		</article>
	)
}
