import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from './routing'

export default getRequestConfig(async ({ locale }) => {
	// Validate that the incoming `locale` parameter is valid
	if (!routing.locales.includes(locale as any)) notFound()
	try {
		const messages = await import(`./locales/${locale}/index.ts`)
		return {
			messages: messages.default
		}
	} catch (error) {
		console.error('Error importing messages:', error)
		notFound()
	}
})
