import { Container } from '@/components/Container'
import { HeaderPages } from '@/components/HeaderPages'
import { Separator } from '@/components/ui/separator'
import { Filters } from './components/Filters'

export default function InboxPage() {
	return (
		<Container>
			<HeaderPages
				title="Inbox"
				subtitle="Todas as mensagens enviadas por seus colaboradores encontra-se aqui."
			/>
			<Separator className="bg-primary/30" />
			<section>
				<Filters />
			</section>
		</Container>
	)
}
