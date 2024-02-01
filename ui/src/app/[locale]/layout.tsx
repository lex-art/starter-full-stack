import { AppThemeMUI } from '@/components/Theme/AppTheme'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { ReactNode, StrictMode, Suspense } from 'react'
import { SkeletonApp } from '@/components/Common/Skeleton/SkeletonApp'
import { Roboto } from 'next/font/google'

type Props = {
	children: ReactNode
	params: { locale: string }
}

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap'
})

export default function LocaleLayout({ children, params: { locale } }: Props) {
	const messages = useMessages()
	return (
		<html lang={locale}>
			<body className={roboto.className}>
				<StrictMode>
					<AppThemeMUI>
						<Suspense fallback={<SkeletonApp />}>
							<NextIntlClientProvider locale={locale} messages={messages}>
								{children}
							</NextIntlClientProvider>
						</Suspense>
					</AppThemeMUI>
				</StrictMode>
			</body>
		</html>
	)
}
