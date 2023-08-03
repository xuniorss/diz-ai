'use client'

import { SYSTEM_NAME } from '@/system'

import { selectHasTypeProfile } from '@/redux/user/user.selector'
import { useAuth } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { FooterPublic } from './components/Footer'
import { NavbarPublic } from './components/Navbar'

export const metadata: Metadata = {
	title: `${SYSTEM_NAME} - Bem-vindo(a)`,
	description: 'Lugar onde o seu funcionário tem voz.',
}

export default function PublicLayout({ children }: { children: ReactNode }) {
	const { userId } = useAuth()
	const hasTypeProfile = useSelector(selectHasTypeProfile)

	if (userId && hasTypeProfile) return redirect('/access')

	return (
		<div className="h-full">
			<NavbarPublic />
			<main className="h-full pt-16">{children}</main>
			<FooterPublic />
		</div>
	)
}
