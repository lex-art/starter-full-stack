import { z } from 'zod'

const simpleFormSchema = z.object({
	email: z.string().email({
		message: 'Invalid email'
	}),
	password: z.string().min(8, { message: 'Password must be at least 8 characters' })
})

export { simpleFormSchema }
