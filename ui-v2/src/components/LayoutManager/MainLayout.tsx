import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { HeaderMain } from '../header-main'
import RootLayout from './BaseLayout'

export default async function MainLayout({
	children,
	locale
}: {
	children: React.ReactNode
	locale: string
}) {
	return (
		<RootLayout locale={locale}>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<HeaderMain />
					{children}
				</SidebarInset>
			</SidebarProvider>
		</RootLayout>
	)
}
