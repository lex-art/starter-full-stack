import { countries } from '@/lib/utilities/constants'
import { z } from 'zod'

type Property = (typeof countries)[number]['value']
// z.enum expects a non-empty array so to work around that
// we pull the first value out explicitly
const VALUES: [Property, ...Property[]] = [
	countries[0].value,
	// And then merge in the remaining values from `properties`
	...countries.slice(1).map((p) => p.value)
]
const advancedValidationSchema = z.object({
	name: z.string().min(2, { message: 'Name must be at least 2 characters' }).optional(),
	email: z.string().email({ message: 'Invalid email' }),
	password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
	birthDate: z.date().max(new Date(), { message: 'Invalid date' }),
	weight: z.number().min(0, { message: 'Weight must be at least 0' }),
	plan: z.string().min(2, { message: 'Plan must be at least 2 characters' }),
	phone: z.string().min(10, { message: 'Phone number must be at least 10 characters' }),
	country: z.enum(VALUES)
})

export { advancedValidationSchema }
