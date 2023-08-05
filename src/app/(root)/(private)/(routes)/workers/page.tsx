import { HeaderPages } from '@/components/HeaderPages'
import { Separator } from '@/components/ui/separator'
import prismadb from '@/lib/prismadb'
import { auth, redirectToSignIn } from '@clerk/nextjs'

import { WorkerList } from './components/WorkerList'

export const revalidate = 0

export default async function WorkersPage() {
	const { userId } = auth()

	if (!userId) return redirectToSignIn()

	const company = await prismadb.company.findFirst({ where: { userId } })

	const workers = await prismadb.companyWorkers.findMany({
		where: { companyId: company?.id },
		include: { user: true },
		orderBy: { createdAt: 'asc' },
	})

	return (
		<article className="flex h-full justify-center">
			<section className="my-5 w-full max-w-screen-lg space-y-4">
				<HeaderPages
					title="Listagem de colaboradores da empresa"
					subtitle={`Total de ${workers.length} pessoas.`}
				/>
				<Separator className="bg-primary/30" />
				<div className="flex flex-col py-4">
					<section className="max-h-[75vh] overflow-y-auto scrollbar-none">
						{workers.map((worker) => (
							<WorkerList key={worker.user.userId} worker={worker} />
						))}
					</section>
				</div>
			</section>
		</article>
	)
}
