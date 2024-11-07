import { z } from 'zod'

const newUserSchema = z.object({
	email: z.string().email(),
	username: z.string().min(3),
	role: z.string().min(3),
	type: z.string().min(3),
	permissions: z.array(z.string().min(3)),

	firstName: z.string().min(3),
	lastName: z.string().min(3),
	birthDate: z.coerce
		.date()
		.transform((date) => date.toISOString().split('T')[0]),
	phone: z.string().min(3),
	address: z.string().min(3),
	countryCode: z.string().min(2),
	countryCallingCode: z.string().min(2)
})
export type NewUserSchema = z.infer<typeof newUserSchema>
export { newUserSchema }
