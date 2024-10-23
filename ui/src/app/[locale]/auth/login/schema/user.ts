import { z } from 'zod'

const userSchema = z.object({
	email: z.string().min(1).max(75), // add your validation here
	password: z.string().min(1).max(16) // add your validation here
})

export { userSchema }
