import { z } from 'zod'

const arraySchema = z.object({
	fields: z
		.array(
			z.object({
				name: z.string().min(1),
				age: z.number().min(1).nullable(),
				relationship: z.string().min(1)
			})
		)
		.min(1)
})

export { arraySchema }
