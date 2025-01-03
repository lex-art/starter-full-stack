import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Roboto, Roboto_Mono } from 'next/font/google'
import { ThemeProvider } from '../theme-provider'

const roboto = Roboto({
	variable: '--font-roboto',
	subsets: ['latin'],
	weight: ['100', '300', '400', '500', '700', '900']
})

const robotoMono = Roboto_Mono({
	variable: '--font-roboto-mono',
	subsets: ['latin'],
	weight: ['400']
})

//export default async function LocaleLayout({
export default async function BaseLayout({
	children,
	locale
}: {
	children: React.ReactNode
	locale: string
}) {
	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages()
	return (
		<html lang={locale} suppressHydrationWarning>
			<body
				className={`${roboto.variable} ${robotoMono.variable} antialiased`}
			>
				<NextIntlClientProvider locale={locale} messages={messages}>
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
