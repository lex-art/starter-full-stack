import MainLayout from '@/components/LayoutManager/MainLayout'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'

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

	return <MainLayout locale={locale}>{children}</MainLayout>
}
