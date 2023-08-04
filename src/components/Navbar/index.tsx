import { SYSTEM_NAME } from '@/system'
import Link from 'next/link'

import { DropdownUser } from '../DropdownUser'
import { MobileSidebar } from '../MobileSidebar'
import { ModeToggle } from '../ModeToggle'

export const Navbar = () => {
	return (
		<header className="fixed z-50 flex h-16 w-full items-center justify-between border-b border-b-primary/10 bg-secondary px-8 py-2">
			<section className="flex items-center">
				<MobileSidebar />
				<Link href="/home" aria-label="Ir para página inicial">
					<h1 className="hidden text-xl font-bold text-primary md:block md:text-3xl">
						{SYSTEM_NAME}
					</h1>
				</Link>
			</section>
			<section className="flex items-center gap-x-3">
				<DropdownUser />
				<ModeToggle />
			</section>
		</header>
	)
}
