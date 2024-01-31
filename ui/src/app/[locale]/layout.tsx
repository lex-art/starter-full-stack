import { NextIntlClientProvider, useMessages } from 'next-intl'
import { headers } from 'next/headers'
import { ReactNode } from 'react'

type Props = {
	children: ReactNode
	params: { locale: string }
}

export default function LocaleLayout({ children, params: { locale } }: Props) {
	const messages = useMessages()
	return (
		<html lang={locale}>
			<body>
				<NextIntlClientProvider locale={locale} messages={messages}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
