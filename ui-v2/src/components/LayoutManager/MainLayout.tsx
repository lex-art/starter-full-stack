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
					<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
						{children}
					</div>
				</SidebarInset>
			</SidebarProvider>
		</RootLayout>
	)
}
