import { AppThemeMUI } from '@/components/Theme/AppTheme'
import localeValues from '@/locales/es'
import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

const messages = localeValues
const locale = 'es'

describe('AppThemeMUI', () => {
	it('renders children', () => {
		const children = <div>Test Children</div>
		render(
			<NextIntlClientProvider messages={messages} locale={locale}>
				<AppThemeMUI initialThemeMode="light">{children}</AppThemeMUI>
			</NextIntlClientProvider>
		)

		expect(screen.getByText('Test Children')).toBeInTheDocument()
	})
})
