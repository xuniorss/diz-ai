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
import {
	FormRhProps,
	FormRhSchema,
	FormWorkerProps,
	FormWorkerSchema,
} from '@/models/forms/authform'
import { getUserFetch, setTypeProfile } from '@/redux/user/slice'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { SubmitHandler, UseFormReturn, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

export const RootForm = () => {
	const { typeProfile } = useStoreUser()
	const router = useRouter()
	const dispatch = useDispatch()

	const formRh = useForm<FormRhProps>({
		resolver: zodResolver(FormRhSchema),
		reValidateMode: 'onChange',
		mode: 'all',
		defaultValues: { companyName: '', cnpj: '', name: '' },
	})

	const formWorker = useForm<FormWorkerProps>({
		resolver: zodResolver(FormWorkerSchema),
		reValidateMode: 'onChange',
		mode: 'all',
		defaultValues: { key: '', name: '' },
	})

	const form = (
		typeProfile === 'RH' ? { ...formRh } : { ...formWorker }
	) as UseFormReturn<FormRhProps | FormWorkerProps>

	const isLoading = useMemo(
		() => form.formState.isSubmitting,
		[form.formState.isSubmitting],
	)

	const onSubmit: SubmitHandler<FormRhProps | FormWorkerProps> = useCallback(
		async (data) => {
			try {
				if (typeProfile === 'RH') await axios.post('/api/user/rh', data)
				else await axios.post('/api/user/worker', data)

				router.refresh()
				router.push('/home')

				dispatch(setTypeProfile(null))
				dispatch(getUserFetch())
			} catch (error) {
				console.error(error)
			}
		},
		[dispatch, router, typeProfile],
	)

	return (
		<Form {...form}>
			{typeProfile && (
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
													: 'Ex: f2122981-2057-4333-87cf-76491660d009'
											}
											disabled={isLoading}
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
												disabled={isLoading}
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
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Seu nome</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
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
						<Button disabled={isLoading} type="submit" size="sm">
							Registrar-se
						</Button>
					</section>
				</form>
			)}
		</Form>
	)
}
