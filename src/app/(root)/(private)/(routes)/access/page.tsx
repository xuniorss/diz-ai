import { SYSTEM_NAME } from '@/system'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: `${SYSTEM_NAME} - Termine o cadastro`,
	description: 'Lugar onde o seu funcionário tem voz.',
}

export default function AccessPage() {
	return <article>Access Page</article>
}
