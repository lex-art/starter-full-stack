'use client'

import { ChevronRight } from 'lucide-react'

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem
} from '@/components/ui/sidebar'
import { Link } from '@/i18n/routing'
import { IMenuRoute } from '@/types/Menu-sidebar'
import { IMessagesKey } from '@/types/Messages'
import { useTranslations } from 'next-intl'

export function NavMain({
	items,
	title
}: {
	items: Array<IMenuRoute>
	title: IMessagesKey
}) {
	const t = useTranslations()
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
							<Collapsible
								key={item.title}
								asChild
								defaultOpen={item.isActive}
								className="group/collapsible"
							>
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<Link href={item.url}>
											<SidebarMenuButton
												tooltip={t(item.title)}
												className="hover:bg-primary-foreground py-3 rounded-lg"
											>
												{item.icon && <item.icon />}
												<span>{t(item.title)}</span>
											</SidebarMenuButton>
										</Link>
									</CollapsibleTrigger>
								</SidebarMenuItem>
							</Collapsible>
						) : (
							<Collapsible
								key={item.title}
								asChild
								defaultOpen={item.isActive}
								className="group/collapsible"
							>
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton
											tooltip={t(item.title)}
											className="hover:bg-primary-foreground py-3 rounded-lg"
										>
											{item.icon && <item.icon />}
											<span>{t(item.title)}</span>
											<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{item.items
												?.filter((route) => {
													//add logic to validate the user role
													return route
												})
												.map((subItem) => (
													<SidebarMenuSubItem
														key={subItem.title}
														className="hover:bg-primary-foreground  py-1 rounded-lg"
													>
														<SidebarMenuSubButton asChild>
															<Link href={subItem.url}>
																<span>{t(subItem.title)}</span>
															</Link>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</SidebarMenuItem>
							</Collapsible>
						)
					)}
			</SidebarMenu>
		</SidebarGroup>
	)
}
