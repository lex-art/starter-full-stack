import { Header } from '@/components/LayoutManager/PageLayout/header/Header'
import localeValues from '@/i18n/locales/es'
import { fireEvent, render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

// Importar después de haber hecho el mock
import { usePathname, useRouter } from '@/i18n/routing'

// Configurar el mock para useRouter y usePathname
const mockedUseRouter = useRouter as jest.Mock
const mockedUsePathname = usePathname as jest.Mock

const messages = localeValues
const locale = 'es'

describe('Header', () => {
	const drawerWidth = 240
	const handleDrawerToggle = jest.fn()
	const handleDrawerOpen = jest.fn()
	const logOut = jest.fn()

	beforeEach(() => {
		mockedUseRouter.mockReturnValue({ push: jest.fn() })
		mockedUsePathname.mockReturnValue('/current-path')
		render(
			<NextIntlClientProvider messages={messages} locale={locale}>
				<Header
					drawerWidth={drawerWidth}
					handleDrawerToggle={handleDrawerToggle}
					open={false}
					handleDrawerOpen={handleDrawerOpen}
					logOut={logOut}
				/>
			</NextIntlClientProvider>
		)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('renders the header title', () => {
		expect(screen.getByText('Mini variant drawer')).toBeInTheDocument()
	})

	it('calls handleDrawerToggle when the drawer toggle button is clicked', () => {
		fireEvent.click(screen.getByLabelText('open drawer'))
		expect(handleDrawerToggle).toHaveBeenCalled()
	})

	it('calls handleDrawerOpen when the drawer open button is clicked', () => {
		fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }))
		expect(handleDrawerOpen).toHaveBeenCalled()
	})

	it('calls logOut when the logout button is clicked', () => {
		fireEvent.click(screen.getByRole('button', { name: 'Logout' }))
		expect(logOut).toHaveBeenCalled()
	})

	// Add more tests as needed
})
