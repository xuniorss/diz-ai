import { SYSTEM_NAME } from '@/system'

import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { FooterPublic } from './components/Footer'
import { NavbarPublic } from './components/Navbar'

export const metadata: Metadata = {
	title: `${SYSTEM_NAME} - Bem-vindo(a)`,
	description: 'Lugar onde o seu funcionário tem voz.',
}

export default async function PublicLayout({
	children,
}: {
	children: ReactNode
}) {
	const { userId, getToken } = auth()

	const token = await getToken()

	if (userId && token) {
		const userlogged = await prismadb.user.findFirst({ where: { userId } })

		if (userlogged) return redirect('/home')
	}

	return (
		<div className="h-full">
			<NavbarPublic />
			<main className="h-full pt-16">{children}</main>
			<FooterPublic />
		</div>
	)
}
