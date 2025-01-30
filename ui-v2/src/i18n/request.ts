import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
	// This typically corresponds to the `[locale]` segment
	let locale = await requestLocale

	// Ensure that a valid locale is used
	if (!locale || !routing.locales.includes(locale as any)) {
		locale = routing.defaultLocale
	}

	return {
		locale,
		messages: (await import(`./messages/${locale}/index.ts`)).default,
		formats: {
			dateTime: {
				short: {
					day: 'numeric',
					month: 'short',
					year: 'numeric'
				}
			},
			number: {
				precise: {
					maximumFractionDigits: 5
				}
			},
			list: {
				enumeration: {
					style: 'long',
					type: 'conjunction'
				}
			}
		},
		onError(error) {
			console.warn('Error de traducción:', error)
		}
	}
})
