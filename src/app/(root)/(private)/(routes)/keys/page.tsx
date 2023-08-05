import { HeaderPages } from '@/components/HeaderPages'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Terminal } from 'lucide-react'
import { ActiveKeys } from './components/ActiveKeys'
import { GenerateKey } from './components/GenerateKey'

export default function KeysPage() {
	return (
		<article className="flex h-full justify-center">
			<section className="my-5 w-full max-w-screen-lg space-y-4">
				<HeaderPages
					title="Gerarenciar suas chaves"
					subtitle="Crie cheves para que seus colaboradores tenham acesso ao
						sistema."
				/>

				<Separator className="bg-primary/30" />

				<section className="space-y-3">
					<Alert className="flex-1">
						<Terminal className="h-4 w-4" />
						<AlertTitle>Um aviso sobre as chaves geradas.</AlertTitle>
						<AlertDescription className="leading-relaxed tracking-wide">
							Todas as chaves geradas tem prazo de validade de 10 minutos
							e são de uso único, certifique-se de que cada colaboarador
							receba uma e as utilize no dentro do prazo.
						</AlertDescription>
					</Alert>
					<GenerateKey />
				</section>

				<Separator className="bg-primary/30" />

				<section className="space-y-4">
					<h2 className="text-sm md:text-base">
						Chaves ativas ou que ainda não foram usadas.
					</h2>
					<ActiveKeys />
				</section>
			</section>
		</article>
	)
}
