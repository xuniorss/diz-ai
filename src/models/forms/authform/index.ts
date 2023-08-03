import { z } from 'zod'

export const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/

export const FormRhSchema = z.object({
	companyName: z
		.string()
		.min(1, { message: 'O nome da empresa é obrigatório.' }),
	cnpj: z
		.string()
		.min(1, { message: 'CNPJ da empresa é obrigatório.' })
		.max(25)
		.refine((value) => cnpjRegex.test(value), { message: 'CNPJ inválido' }),
	name: z.string().min(1, { message: 'Informe seu nome.' }),
})

export const FormWorkerSchema = z.object({
	key: z
		.string()
		.uuid()
		.min(1, { message: 'A chave de acesso é obrigatória.' }),
	name: z.string().min(1, { message: 'Informe seu nome.' }),
})

export type FormRhProps = z.infer<typeof FormRhSchema>
export type FormWorkerProps = z.infer<typeof FormWorkerSchema>
