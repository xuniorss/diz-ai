import { Container } from '@/components/Container'
import { HeaderPages } from '@/components/HeaderPages'
import { LinkBack } from '@/components/LinkBack'
import { Separator } from '@/components/ui/separator'
import prismadb from '@/lib/prismadb'
import { format } from 'date-fns'
import { redirect } from 'next/navigation'

export default async function OccurrenceIdPage({
	params,
}: {
	params: { occurrenceId: string }
}) {
	const occurrence = await prismadb.occurrencies.findFirst({
		where: { id: params.occurrenceId },
	})

	const occurrenceType = await prismadb.occurrenciesTypes.findFirst({
		where: { id: occurrence?.occurrenceTypeId },
	})

	if (!occurrence || !occurrenceType?.name) return redirect('/inbox')

	return (
		<Container>
			<header
				aria-label="header inbox details"
				className="flex items-center justify-between"
			>
				<div className="flex items-center gap-x-7">
					<LinkBack href="/inbox" />
					<HeaderPages
						title="Detalhes da ocorrência"
						subtitle={`${
							occurrence?.email
								? `Mensagem de: ${occurrence.email}.`
								: 'Mensagem em anonimato.'
						}`}
					/>
				</div>
				<span className="text-center text-sm">
					<p className="font-semibold">Realizada em</p>
					{format(new Date(occurrence?.createdAt), 'dd/MM/yyyy')}
				</span>
			</header>
			<Separator className="bg-primary/30" />
			<section className="flex flex-col space-y-3">
				<div className="space-y-5">
					<h2 className="text-xl font-semibold leading-relaxed">
						Classificação da mensagem: {occurrenceType.name}
					</h2>
					<p className="text-justify leading-relaxed">
						{occurrence.message}
					</p>
				</div>
			</section>
		</Container>
	)
}
