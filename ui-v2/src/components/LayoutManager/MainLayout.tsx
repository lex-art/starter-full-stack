import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { locales } from '@/i18n/routing'
import { headers } from 'next/headers'
import { HeaderMain } from '../header-main'
import BaseLayout from './BaseLayout'

const excludePaths = ['/auth/*', '/landing']

export default async function MainLayout({
	children,
	locale
}: {
	children: React.ReactNode
	locale: string
}) {
	const header = await headers()
	const currentPath = header.get('x-url') || ''
	const isExcludeLayout = RegExp(
		`^(/(${locales.join('|')}))?(${excludePaths.map((p) => p.replace(/\*/g, '.*')).join('|')})$`,
		'i'
	).test(currentPath)

	return (
		<BaseLayout locale={locale}>
			{isExcludeLayout ? (
				<main>{children}</main>
			) : (
				<SidebarProvider>
					<AppSidebar />
					<SidebarInset>
						<HeaderMain />
						<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
							{children}
						</div>
					</SidebarInset>
				</SidebarProvider>
			)}
		</BaseLayout>
	)
}
