import { z } from 'zod'

const userSchema = z.object({
	email: z.string().email(),
	username: z.string().min(3),
	role: z.string().min(3),
	type: z.string().min(3),
	permissions: z.array(z.string().min(3)),

	firstName: z.string().min(3),
	lastName: z.string().min(3),
	birthDate: z.date(),
  phone: z.string().min(3),
  address: z.string().min(3),
  countryCode: z.string().min(3),
  countryCallingCode: z.string().min(3),
})
export type UserSchema = z.infer<typeof userSchema>
export { userSchema }
