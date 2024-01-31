import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { locales } from './navigation'

export default getRequestConfig(async (param) => {
	const { locale } = param as { locale: 'en' | 'es' }
	// Validate that the incoming `locale` parameter is valid
	if (!locales.includes(locale)) notFound()

	return {
		messages: (await import(`./locales/${locale}/index.ts`)).default
	}
})
