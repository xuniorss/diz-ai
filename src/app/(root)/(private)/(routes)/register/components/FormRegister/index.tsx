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
import { useStoreOccurrence } from '@/hooks/useStoreOccurrence'
import { useStoreUser } from '@/hooks/useStoreUser'
import {
	OccurrenceProps,
	OccurrenceSchema,
} from '@/models/forms/occurrence-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

export const FormRegister = () => {
	const [enable, setEnable] = useState(false)

	const { user } = useStoreUser()
	const { isLoading, occurrencies } = useStoreOccurrence()

	const form = useForm<OccurrenceProps>({
		resolver: zodResolver(OccurrenceSchema),
		defaultValues: { ocurrenceTypeId: undefined, message: '' },
	})

	const onSubmit: SubmitHandler<OccurrenceProps> = useCallback(
		(values) => {
			try {
				let data = {
					email: enable ? user?.email : null,
					...values,
				}
			} catch (error) {
				console.error(error)
			}
		},
		[enable, user?.email],
	)

	return (
		<div className="h-full space-y-10">
			<section className="flex items-center justify-between">
				<span className="flex items-center space-x-2">
					<Switch
						aria-label="enable/disable visibility"
						id="enable-identification"
						checked={enable}
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
						name="ocurrenceTypeId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Classifique sua ocorrência</FormLabel>
								<Select
									disabled={isLoading}
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
										disabled={isLoading}
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
						<Button type="submit" aria-label="send a message">
							Enviar mensagem
							<Send className="ml-2 h-4 w-4" />
						</Button>
					</div>
				</Form>
			</form>
		</div>
	)
}
