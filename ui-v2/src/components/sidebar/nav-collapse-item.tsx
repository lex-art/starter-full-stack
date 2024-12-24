import { Link } from '@/i18n/routing'
import { IMenuRoute } from '@/types/Menu-sidebar'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from '../ui/collapsible'
import {
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem
} from '../ui/sidebar'

export function NavCollapsibleItem({
	title,
	icon: Icon,
	isActive,
	currentPathname,
	items
}: IMenuRoute) {
	const t = useTranslations()

	return (
		<Collapsible
			key={title}
			asChild
			defaultOpen={
				isActive || items?.some((item) => item.url === currentPathname)
			}
			className="group/collapsible"
		>
			<SidebarMenuItem>
				<CollapsibleTrigger asChild>
					<SidebarMenuButton
						tooltip={t(title)}
						className="hover:bg-primary-foreground py-3 rounded-lg"
					>
						{Icon && <Icon />}
						<span>{t(title)}</span>
						<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
					</SidebarMenuButton>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub>
						{items
							?.filter((route) => {
								//add logic to validate the user role
								return route
							})
							.map((subItem) => (
								<SidebarMenuSubItem
									key={subItem.title}
									className={`${subItem.url === currentPathname ? 'bg-primary-foreground' : ''}  hover:bg-primary-foreground  py-1 rounded-lg`}
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
}
