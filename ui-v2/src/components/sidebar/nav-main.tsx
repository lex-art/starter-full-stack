'use client'

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu
} from '@/components/ui/sidebar'
import { IMenuRoute } from '@/types/Menu-sidebar'
import { IMessagesKey } from '@/types/Messages'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { NavCollapsibleItem } from './nav-collapse-item'
import { NavItem } from './nav-item'

export function NavMain({
	items,
	title
}: {
	items: Array<IMenuRoute>
	title: IMessagesKey
}) {
	const t = useTranslations()
	const pathname = usePathname()
	return (
		<SidebarGroup>
			<SidebarGroupLabel>{t(title)}</SidebarGroupLabel>
			<SidebarMenu>
				{items
					.filter((route) => {
						//add logic to validate the user role
						return route
					})
					.map((item) =>
						!item.items ? (
							<NavItem
								key={item.url}
								title={item.title}
								url={item.url}
								icon={item.icon}
								isActive={item.isActive}
								currentPathname={pathname}
							/>
						) : (
							<NavCollapsibleItem
								key={item.title}
								title={item.title}
								icon={item.icon}
								isActive={item.isActive}
								items={item.items}
								url={item.url}
								currentPathname={pathname}
							/>
						)
					)}
			</SidebarMenu>
		</SidebarGroup>
	)
}
