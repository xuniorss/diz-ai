'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useStoreUser } from '@/hooks/useStoreUser'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import {
	FormProvider,
	SubmitHandler,
	useForm,
	UseFormReturn,
} from 'react-hook-form'
import { z } from 'zod'

const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/

const FormRhSchema = z.object({
	companyName: z
		.string()
		.min(1, { message: 'O nome da empresa é obrigatório.' }),
	cnpj: z
		.string()
		.min(1, { message: 'CNPJ da empresa é obrigatório.' })
		.max(25)
		.refine((value) => cnpjRegex.test(value), { message: 'CNPJ inválido' }),
	rhname: z.string().min(1, { message: 'Informe seu nome.' }),
})

const FormWorkerSchema = z.object({
	key: z.string().min(1, { message: 'A chave de acesso é obrigatória.' }),
	workername: z.string().min(1, { message: 'Informe seu nome.' }),
})

type FormRhProps = z.infer<typeof FormRhSchema>
type FormWorkerProps = z.infer<typeof FormWorkerSchema>

export const RootForm = () => {
	const { typeProfile } = useStoreUser()

	const formRh = useForm<FormRhProps>({
		resolver: zodResolver(FormRhSchema),
		reValidateMode: 'onChange',
		mode: 'all',
		defaultValues: { companyName: '' },
	})

	const formWorker = useForm<FormWorkerProps>({
		resolver: zodResolver(FormWorkerSchema),
		reValidateMode: 'onChange',
		mode: 'all',
		defaultValues: { key: '' },
	})

	const form = (
		typeProfile === 'RH' ? { ...formRh } : { ...formWorker }
	) as UseFormReturn<FormRhProps | FormWorkerProps>

	const onSubmit: SubmitHandler<FormRhProps | FormWorkerProps> = useCallback(
		(data) => {
			try {
				console.log(data)
			} catch (error) {
				console.error(error)
			}
		},
		[],
	)

	return (
		<FormProvider {...form}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex h-full w-full flex-col space-y-7"
				>
					<section className="flex-1 space-y-6">
						<FormField
							control={form.control}
							name={typeProfile === 'RH' ? 'companyName' : 'key'}
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{typeProfile === 'RH'
											? 'Nome da empresa'
											: 'Chave de acesso'}
									</FormLabel>
									<FormControl>
										<Input
											placeholder={
												typeProfile === 'RH'
													? 'Ex: Americanas'
													: 'Chave de acesso'
											}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										{typeProfile === 'RH'
											? 'Informe o nome da empresa a qual você trabalha no departamento de Recursos Humanos (RH).'
											: 'Informe a chave de acesso fornecida pelo RH da sua empresa.'}
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						{typeProfile === 'RH' && (
							<FormField
								control={form.control}
								name="cnpj"
								render={({ field }) => (
									<FormItem>
										<FormLabel>CNPJ da empresa</FormLabel>
										<FormControl>
											<Input
												placeholder="Ex: 56.473.883/0001-01"
												maxLength={18}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}

						<FormField
							control={form.control}
							name={typeProfile === 'RH' ? 'rhname' : 'workername'}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Seu nome</FormLabel>
									<FormControl>
										<Input
											placeholder="Informe seu nome"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</section>

					<section className="flex w-full justify-end gap-x-4">
						<Button type="submit" size="sm">
							Registrar-se
						</Button>
					</section>
				</form>
			</Form>
		</FormProvider>
	)
}
