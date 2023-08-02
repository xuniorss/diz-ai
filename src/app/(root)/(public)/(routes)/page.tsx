import { CardProfileType } from '@/components/CardProfileType'
import { knowMoreRh, knowMoreWorker } from '@/system'

export default function Home() {
	return (
		<article className="flex h-full flex-col items-center">
			<section className="my-6 flex w-full max-w-screen-lg flex-1 flex-col items-center justify-center space-y-7">
				<h1 className="text-3xl font-bold lg:text-4xl">
					Qual seu perfil ?
				</h1>
				<div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
					<CardProfileType
						title="Sou RH"
						description="Responsável por cuidar das pessoas que fazem parte da organização."
						type="RH"
						knowMore={knowMoreRh}
					/>
					<CardProfileType
						title="Sou Funcionário"
						description="Parte essencial de uma empresa, pessoa que colabora para o crescimento da mesma."
						type="WORKER"
						knowMore={knowMoreWorker}
					/>
				</div>
			</section>
		</article>
	)
}
