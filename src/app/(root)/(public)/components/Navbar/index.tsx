import { ModeToggle } from '@/components/ModeToggle'
import { SYSTEM_NAME } from '@/system'
import Link from 'next/link'

export const NavbarPublic = () => {
	return (
		<header className="fixed z-50 flex h-16 w-full items-center justify-center bg-secondary px-4 py-2">
			<div className="flex w-full max-w-7xl items-center justify-between">
				<section className="flex items-center">
					<Link href="/" aria-label="Ir para página inicial">
						<h1 className="hidden text-2xl font-bold text-primary md:block md:text-4xl">
							{SYSTEM_NAME}
						</h1>
					</Link>
				</section>
				<section className="flex items-center">
					<ModeToggle />
				</section>
			</div>
		</header>
	)
}
