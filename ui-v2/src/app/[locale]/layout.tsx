import { ThemeProvider } from '@/components/theme-provider'
import { routing } from '@/i18n/routing'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Roboto, Roboto_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'

const roboto = Roboto({
	variable: '--font-roboto',
	subsets: ['latin'],
	weight: ['100', '300', '400', '500', '700', '900']
})

const robotoMono = Roboto_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
	weight: ['400']
})
//export default async function LocaleLayout({
export default async function RootLayout({
	children,
	params
}: {
	children: React.ReactNode
	params: { locale: string }
}) {
	// Ensure that the incoming `locale` is valid
	const { locale } = await params
	if (!routing.locales.includes(locale as any)) {
		notFound()
	}

	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages()

	return (
		<html lang={locale} suppressHydrationWarning>
			<body
				className={`${roboto.variable} ${robotoMono.variable} antialiased`}
			>
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
