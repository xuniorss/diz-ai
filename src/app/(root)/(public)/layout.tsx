import { SYSTEM_NAME } from '@/system'

import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { NavbarPublic } from './components/Navbar'

export const metadata: Metadata = {
	title: `${SYSTEM_NAME} - Bem-vindo(a)`,
	description: 'Lugar onde o seu funcionário tem voz.',
}

export default function PublicLayout({ children }: { children: ReactNode }) {
	return (
		<div className="h-full">
			<NavbarPublic />
			<main className="h-full pt-16">{children}</main>
		</div>
	)
}
