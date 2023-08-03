import { auth, redirectToSignIn } from '@clerk/nextjs'
import { ReactNode } from 'react'

export default function PrivateLayout({ children }: { children: ReactNode }) {
	const { userId } = auth()

	if (!userId) return redirectToSignIn()

	return (
		<div className="h-full">
			<main className="mx-auto h-full px-4">{children}</main>
		</div>
	)
}
