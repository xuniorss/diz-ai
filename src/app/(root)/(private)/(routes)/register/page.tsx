import { Container } from '@/components/Container'
import { HeaderPages } from '@/components/HeaderPages'
import { Separator } from '@/components/ui/separator'
import { FormRegister } from './components/FormRegister'

export default function RegisterPage() {
	return (
		<Container>
			<HeaderPages
				title="Registre uma nova ocorrência"
				subtitle="O RH da sua empresa receberá automaticamente sua mensagem. Lembre-se de ser educado(a)."
			/>
			<Separator className="bg-primary/30" />

			<section>
				<FormRegister />
			</section>
		</Container>
	)
}
