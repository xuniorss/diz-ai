'use client'

import { rhRoutes, workRoutes } from '@/constants/navigation'
import { useStoreOccurrence } from '@/hooks/useStoreOccurrence'
import { useStoreUser } from '@/hooks/useStoreUser'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { Badge } from '../ui/badge'

export const Sidebar = () => {
	const pathname = usePathname()
	const router = useRouter()

	const { user } = useStoreUser()
	const { occurrenceNotReadCount } = useStoreOccurrence()

	const onNavigate = useCallback(
		(url: string) => {
			return router.push(url)
		},
		[router],
	)

	const routes = useMemo(
		() => (user?.isRh ? rhRoutes : workRoutes),
		[user?.isRh],
	)

	if (pathname === '/access') return null

	return (
		<aside className="flex h-full flex-col space-y-4 bg-secondary text-primary">
			<section className="felx flex-1 justify-center p-3">
				<nav className="space-y-2">
					{routes.map((route) => (
						<div
							role="button"
							aria-label={`Navegar para ${route.label}`}
							tabIndex={0}
							onClick={() => onNavigate(route.href)}
							onKeyDown={(event) => {
								if (event.key === ' ' || event.key === 'Spacebar') {
									event.preventDefault()
									onNavigate(route.href)
								}
							}}
							key={route.href}
							className={cn(
								'group flex w-full cursor-pointer justify-start rounded-lg p-3 text-xs font-medium text-muted-foreground transition hover:bg-primary/10',
								pathname === route.href && 'bg-primary/10',
							)}
						>
							<div className="flex flex-1 flex-col items-center gap-y-2">
								<route.icon className="h-5 w-5" />
								<p>{route.label}</p>
								{route.hasNotifications && (
									<Badge variant="outline">
										{occurrenceNotReadCount}
									</Badge>
								)}
							</div>
						</div>
					))}
				</nav>
			</section>
		</aside>
	)
}
