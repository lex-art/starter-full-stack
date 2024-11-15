import { z } from 'zod'
const userSchema = z.object({
	email: z.string().min(1).max(75), // add your validation here
	password: z.string().min(1).max(32) // add your validation here
})

const newPasswordSchema = z
	.object({
		password: z.string().min(1).max(32), // add your validation here
		confirmPassword: z.string().min(1).max(32) // add your validation here
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword']
	})

type UserSchema = z.infer<typeof userSchema>
type NewPasswordSchema = z.infer<typeof newPasswordSchema>
export { newPasswordSchema, userSchema }
export type { NewPasswordSchema, UserSchema }
