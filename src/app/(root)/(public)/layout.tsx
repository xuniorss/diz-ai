import { SYSTEM_NAME } from '@/system'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
	title: `${SYSTEM_NAME} - Bem-vindo(a)`,
	description: 'Lugar onde o seu funcionário tem voz.',
}

export default function PublicLayout({ children }: { children: ReactNode }) {
	return <div className="h-full">{children}</div>
}
