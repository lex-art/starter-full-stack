import localeValues from '@/i18n/locales/en'

// Mock de cookies
jest.mock('next/headers', () => ({
	cookies: () => ({
		get: jest.fn().mockReturnValue({ value: 'dark' }) // Mockear el valor de la cookie
	}),
	headers: () => ({
		get: jest.fn().mockReturnValue('/some-path')
	})
}))

const messages = localeValues // Define mensajes mockeados si es necesario
const locale = 'en'

describe('LocaleLayout', () => {
	/* it('renders children when exclude layout is true', () => {
		const children = <div>Test Children</div>
		const { container } = render(
			<NextIntlClientProvider messages={messages} locale={locale}>
				<LocaleLayout params={{ locale }}>{children}</LocaleLayout>
			</NextIntlClientProvider>
		)

		expect(screen.getByText('Test Children')).toBeInTheDocument()
		expect(container.querySelector('main')).toBeInTheDocument()
	}) */
	/* it('renders PageLayout when exclude layout is false', () => {
		const children = <div>Test Children</div>
		const { container } = render(
			<NextIntlClientProvider messages={messages} locale={locale}>
				<LocaleLayout params={{ locale }}>{children}</LocaleLayout>
			</NextIntlClientProvider>
		)

		expect(screen.getByText('Test Children')).toBeInTheDocument()
		expect(container.querySelector('main')).not.toBeInTheDocument()
	})

	it('renders with initial theme mode', () => {
		const children = <div>Test Children</div>
		const initialThemeMode: PaletteMode = 'light'
		render(
			<NextIntlClientProvider messages={messages} locale={locale}>
				<LocaleLayout params={{ locale }}>{children}</LocaleLayout>
			</NextIntlClientProvider>
		)

		expect(screen.getByText('Test Children')).toBeInTheDocument()
		// Add assertions for the theme mode
	}) */
	// Add more tests as needed
})
