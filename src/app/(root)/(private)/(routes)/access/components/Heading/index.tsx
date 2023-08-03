'use client'

import { buttonVariants } from '@/components/ui/button'
import { useStoreUser } from '@/hooks/useStoreUser'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export const Heading = () => {
	const { typeProfile } = useStoreUser()

	if (!typeProfile)
		return (
			<div className="flex flex-col items-center space-y-3">
				<h1 className="text-xl font-bold md:text-2xl lg:text-3xl">
					Volte e escolha seu perfil.
				</h1>
				<Link
					aria-label="button back to home"
					href="/"
					className={buttonVariants({
						variant: 'default',
						className: 'w-full',
					})}
				>
					<ChevronLeft className="mr-2 h-5 w-5" />
					Voltar
				</Link>
			</div>
		)

	return (
		<header
			aria-label="header page access"
			className="flex w-full flex-col space-y-3"
		>
			<section className="flex items-center">
				<Link
					href="/"
					aria-label="link back to home"
					className={buttonVariants({ variant: 'default', size: 'sm' })}
				>
					<ChevronLeft className="mr-1 h-4 w-4" />
					<p className="text-sm">Voltar</p>
				</Link>
			</section>
			<section>
				<h1 className="text-lg font-semibold md:text-xl">
					Que legal, seu perfil é{' '}
					{typeProfile === 'WORKER' ? 'Funcionário(a)' : typeProfile}.
				</h1>
			</section>
		</header>
	)
}
