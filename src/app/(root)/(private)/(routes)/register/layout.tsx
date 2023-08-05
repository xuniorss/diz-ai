import prismadb from '@/lib/prismadb'
import { auth, redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default async function RegisterLayout({
	children,
}: {
	children: ReactNode
}) {
	const { userId } = auth()

	if (!userId) return redirectToSignIn()

	const user = await prismadb.user.findFirst({ where: { userId } })

	if (user?.isRh) return redirect('/')

	return (
		<div className="h-full">
			<main className="h-full">{children}</main>
		</div>
	)
}
