import { z } from 'zod'

export const OccurrenceSchema = z.object({
	ocurrenceTypeId: z
		.string()
		.uuid()
		.min(1, { message: 'Classificação é obrigatória.' }),
	message: z
		.string()
		.min(1, { message: 'Menssagem é obrigatória.' })
		.max(300, { message: 'Quantidade de caracateres permitida atingida.' }),
})

export type OccurrenceProps = z.infer<typeof OccurrenceSchema>
