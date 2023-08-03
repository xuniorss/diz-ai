import { SYSTEM_NAME } from '@/system'
import type { Metadata } from 'next'
import { RootForm } from './components/Form'
import { Heading } from './components/Heading'

export const metadata: Metadata = {
	title: `${SYSTEM_NAME} - Termine o cadastro`,
	description: 'Lugar onde o seu funcionário tem voz.',
}

export default function AccessPage() {
	return (
		<article className="flex h-full flex-col items-center justify-center">
			<div className="flex w-full max-w-xl flex-col items-center space-y-10 py-2">
				<Heading />
				<RootForm />
			</div>
		</article>
	)
}
