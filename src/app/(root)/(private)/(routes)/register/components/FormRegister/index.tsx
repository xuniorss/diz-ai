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
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { useStoreOccurrence } from '@/hooks/useStoreOccurrence'
import { useStoreUser } from '@/hooks/useStoreUser'
import {
	OccurrenceProps,
	OccurrenceSchema,
} from '@/models/forms/occurrence-form'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

export const FormRegister = () => {
	const [enable, setEnable] = useState(false)
	const { toast } = useToast()
	const router = useRouter()

	const { user } = useStoreUser()
	const { occurrencies } = useStoreOccurrence()

	const form = useForm<OccurrenceProps>({
		resolver: zodResolver(OccurrenceSchema),
		defaultValues: { occurrenceTypeId: undefined, message: '' },
	})

	const isSubmitting = useMemo(
		() => form.formState.isSubmitting,
		[form.formState.isSubmitting],
	)

	const handleCancelSendMessage = useCallback(
		async (occurrenceId: string) => {
			try {
				await axios.delete(`/api/user/worker/occurrencies/${occurrenceId}`)

				toast({ title: 'Ocorrência desfeita.' })
			} catch (error) {
				console.log(error)
				toast({
					title: 'Problema ao desfazer ocorrência.',
					variant: 'destructive',
				})
			}
		},
		[toast],
	)

	const onSubmit: SubmitHandler<OccurrenceProps> = useCallback(
		async (values) => {
			try {
				let data = {
					email: enable ? user?.email : null,
					...values,
				}

				const { data: response } = await axios.post(
					'/api/user/worker/occurrencies',
					data,
				)

				form.reset()
				router.refresh()
				setEnable(false)

				console.log(response)

				toast({
					title: 'Ocorrência registrada.',
					duration: 8000,
					description:
						'Caso queira cancelar o envio, clique no botão ao lado.',
					action: (
						<ToastAction
							onClick={() => handleCancelSendMessage(response.id)}
							altText="Desfazer envio"
						>
							Desfazer envio
						</ToastAction>
					),
				})
			} catch (error) {
				console.error(error)
			}
		},
		[enable, form, handleCancelSendMessage, router, toast, user?.email],
	)

	return (
		<div className="h-full space-y-10">
			<section className="flex items-center justify-between">
				<span className="flex items-center space-x-2">
					<Switch
						aria-label="enable/disable visibility"
						id="enable-identification"
						checked={enable}
						disabled={isSubmitting}
						onCheckedChange={() => setEnable((prevState) => !prevState)}
					/>
					<Label
						htmlFor="enable-identification"
						className="cursor-pointer select-none text-base"
					>
						Gostaria de identificar-se?
					</Label>
				</span>
				<p>{enable ? user?.email : 'Anonimato'}</p>
			</section>

			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<Form {...form}>
					<FormField
						control={form.control}
						name="occurrenceTypeId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Classifique sua ocorrência</FormLabel>
								<Select
									disabled={isSubmitting}
									onValueChange={field.onChange}
									value={field.value}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="bg-background">
											<SelectValue
												defaultValue={field.value}
												placeholder="Selecione um tipo"
											/>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{occurrencies?.map((occ) => (
											<SelectItem key={occ.id} value={occ.id}>
												{occ.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Descreva sua ocorrência</FormLabel>
								<FormControl>
									<Textarea
										disabled={isSubmitting}
										rows={7}
										className="resize-none bg-background"
										placeholder="Ex: Olá, gostaria de dizer que..."
										maxLength={300}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Sua mensagem deve ter no máximo 300 caracteres.
									Lembre-se de ser educado(a).
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex w-full justify-end">
						<Button
							disabled={isSubmitting}
							type="submit"
							aria-label="send a message"
						>
							Enviar mensagem
							<Send className="ml-2 h-4 w-4" />
						</Button>
					</div>
				</Form>
			</form>
		</div>
	)
}
