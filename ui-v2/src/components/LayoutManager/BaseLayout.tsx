import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTimeZone } from 'next-intl/server'
import { Roboto, Roboto_Mono } from 'next/font/google'
import { ThemeProvider } from '../theme-provider'
import { Toaster } from '../ui/toaster'

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
	const timeZone = await getTimeZone()
	return (
		<html
			lang={locale}
			suppressHydrationWarning
			suppressContentEditableWarning
		>
			<body
				className={`${roboto.variable} ${robotoMono.variable} antialiased`}
			>
				<NextIntlClientProvider
					locale={locale}
					messages={messages}
					timeZone={timeZone}
					now={new Date()}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
						<Toaster />
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
