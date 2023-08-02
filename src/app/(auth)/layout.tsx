import { SYSTEM_NAME } from '@/system'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
	title: `${SYSTEM_NAME} - Acesse ou crie sua conta`,
	description: 'Acesse ou crie sua conta, desfrute da facilidade.',
}

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex h-full items-center justify-center">{children}</div>
	)
}
