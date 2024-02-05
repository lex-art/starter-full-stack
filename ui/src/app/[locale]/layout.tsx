import { AppThemeMUI } from '@/components/Theme/AppTheme'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { ReactNode, StrictMode, Suspense } from 'react'
import { SkeletonApp } from '@/components/Common/Skeleton/SkeletonApp'
import { Roboto } from 'next/font/google'
import PageLayout from '@/components/PageLayout/PageLayout'
import { headers } from 'next/headers'
import { locales } from '@/navigation'
import Head from 'next/head'

type Props = {
	children: ReactNode
	params: { locale: string }
}

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap'
})
const excludePaths = ['/auth/*']

export default function LocaleLayout({ children, params: { locale } }: Props) {
	const messages = useMessages()
	const header = headers()
	const currentPath = header.get('x-url') || ''
	const isExcludeLayout = RegExp(
		`^(/(${locales.join('|')}))?(${excludePaths.map((p) => p.replace(/\*/g, '.*')).join('|')})$`,
		'i'
	).test(currentPath)
	return (
		<html lang={locale}>
			<body className={roboto.className}>
				<Head>
					<meta name="viewport" content="initial-scale=1, width=device-width" />
				</Head>
				<StrictMode>
					<AppThemeMUI>
						<Suspense fallback={<SkeletonApp />}>
							<NextIntlClientProvider locale={locale} messages={messages}>
								{isExcludeLayout ? <main>{children}</main> : <PageLayout>{children}</PageLayout>}
							</NextIntlClientProvider>
						</Suspense>
					</AppThemeMUI>
				</StrictMode>
			</body>
		</html>
	)
}
