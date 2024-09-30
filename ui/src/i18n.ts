import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from './i18n/routing'

export default getRequestConfig(async (param) => {
	const { locale } = param as { locale: 'en' | 'es' }
	// Validate that the incoming `locale` parameter is valid
	if (!locales.includes(locale)) notFound()

	return {
		messages: (await import(`./i18n/locales/${locale}/index.ts`)).default
	}
})
