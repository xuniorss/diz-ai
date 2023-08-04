import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { SYSTEM_NAME } from '@/system'
import { auth, redirectToSignIn } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
	title: SYSTEM_NAME,
	description: 'Lugar onde o seu funcionário tem voz.',
}

export default function PrivateLayout({ children }: { children: ReactNode }) {
	const { userId } = auth()

	if (!userId) return redirectToSignIn()

	return (
		<div className="h-full">
			<Navbar />
			<div className="fixed inset-y-0 mt-16 hidden w-28 flex-col md:flex">
				<Sidebar />
			</div>
			<main className="h-full px-6 pt-16 md:px-3 md:pl-28">{children}</main>
		</div>
	)
}
