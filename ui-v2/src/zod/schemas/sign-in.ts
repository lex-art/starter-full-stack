import { object, string } from 'zod'

export const signInSchema = object({
	email: string({ required_error: 'Email is required' })
		.min(1)
		.email()
		.nonempty('Email is required'),
	password: string({ required_error: 'Password is required' })
		.min(1)
		.min(8)
		.max(32)
})
