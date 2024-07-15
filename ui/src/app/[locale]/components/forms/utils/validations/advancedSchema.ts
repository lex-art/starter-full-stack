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
	name: z.string().min(2).optional(),
	email: z.string().email(),
	password: z.string().min(8),
	birthDate: z.date().max(new Date(), { message: 'Invalid date' }),
	weight: z.number().min(0),
	plan: z.string().min(2),
	phone: z.string().min(10),
	country: z.enum(VALUES).default('')
})

export { advancedValidationSchema }
