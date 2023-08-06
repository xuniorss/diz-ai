'use client'

import { useStoreWorkers } from '@/hooks/useStoreWorkers'
import { format } from 'date-fns'
import { AtSign, User } from 'lucide-react'

export const WorkerList = () => {
	const { workerInCompany } = useStoreWorkers()

	return (
		<>
			{workerInCompany?.length <= 0 && <p>Nada encontrado.</p>}

			{workerInCompany?.map(({ user }) => (
				<div
					key={user.userId}
					className="flex w-full items-center justify-between rounded-md border border-muted-foreground/70 px-4 py-2"
				>
					<div className="flex flex-col space-y-1">
						<span className="flex items-center text-base">
							<User className="mr-2 h-4 w-4" />
							<p>{user.name}</p>
						</span>
						<span className="flex items-center text-sm text-muted-foreground">
							<AtSign className="mr-2 h-4 w-4" />
							<p>{user.email}</p>
						</span>
					</div>
					<span className="flex items-center gap-x-2 text-sm">
						<p className="hidden md:block">Conta criada desde:</p>

						<time>{format(new Date(user.createdAt), 'dd/MM/yyyy')}</time>
					</span>
				</div>
			))}
		</>
	)
}
