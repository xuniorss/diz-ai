'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useStoreOccurrence } from '@/hooks/useStoreOccurrence'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const InboxList = () => {
	const [isMounted, setIsMounted] = useState(false)
	const { workerOccurrencies, isLoading } = useStoreOccurrence()

	useEffect(() => setIsMounted(true), [])

	if (!isMounted) return null

	return (
		<section className="w-full">
			<div className="flex flex-col space-y-3">
				{isLoading &&
					workerOccurrencies?.map((workerOcc) => (
						<Skeleton
							key={workerOcc.id}
							className="rounded-md bg-background/80 p-3 shadow-md"
						/>
					))}

				{!isLoading &&
					workerOccurrencies?.map((workerOcc) => (
						<Link
							key={workerOcc.id}
							href={`/inbox/${workerOcc.id}`}
							className="rounded-md bg-background/80 p-3 leading-relaxed shadow-md"
						>
							<p className="truncate">
								<b>Mensagem:</b> {workerOcc.message}
							</p>
							{workerOcc.email && (
								<p>
									<b>E-mail:</b> {workerOcc.email}
								</p>
							)}
						</Link>
					))}
			</div>
		</section>
	)
}
