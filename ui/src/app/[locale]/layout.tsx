import { AppThemeMUI } from '@/components/Theme/AppTheme'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { ReactNode, StrictMode, Suspense } from 'react'
import SkeletonApp from '@/components/SkeletonApp/SkeletonApp'
import { Roboto } from 'next/font/google'
import PageLayout from '@/components/LayoutManager/PageLayout/PageLayout'
import { cookies, headers } from 'next/headers'
import { locales } from '@/navigation'
import { PaletteMode } from '@mui/material'
import LayoutHeaderMainFooter from '@/components/LayoutManager/LayoutHeaderMainFooter/LayoutHeaderMainFooter'
import { Metadata, Viewport } from 'next'

type Props = {
	readonly children: ReactNode
	readonly params: { locale: string }
}

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap'
})
const excludePaths = ['/auth/*', '/landing']

export const metadata: Metadata = {
	title: 'Starter-Next-App'
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1
}

export default function LocaleLayout({ children, params: { locale } }: Props) {
	const messages = useMessages()
	const header = headers()
	const cookieStore = cookies()
	const currentPath = header.get('x-url') || ''
	const isExcludeLayout = RegExp(
		`^(/(${locales.join('|')}))?(${excludePaths.map((p) => p.replace(/\*/g, '.*')).join('|')})$`,
		'i'
	).test(currentPath)
	const initialThemeMode = (cookieStore.get('theme')?.value || 'light') as PaletteMode
	const isOpenDrawer = cookieStore.get('drawerOpen')?.value === 'true'
	return (
		<html lang={locale}>
			<body className={roboto.className}>
				<StrictMode>
					<NextIntlClientProvider locale={locale} messages={messages}>
						<AppThemeMUI initialThemeMode={initialThemeMode}>
							<Suspense fallback={<SkeletonApp />}>
								{isExcludeLayout ? (
									<main>{children}</main>
								) : (
									<PageLayout isOpenDrawer={isOpenDrawer}>{children}</PageLayout>
								)}
							</Suspense>
						</AppThemeMUI>
					</NextIntlClientProvider>
				</StrictMode>
			</body>
		</html>
	)
}
