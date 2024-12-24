import { Link } from '@/i18n/routing'
import { IMenuRoute } from '@/types/Menu-sidebar'
import { useTranslations } from 'next-intl'
import { Collapsible, CollapsibleTrigger } from '../ui/collapsible'
import { SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'

export function NavItem({
	title,
	url,
	icon: Icon,
	currentPathname
}: IMenuRoute) {
	const t = useTranslations()
	return (
		<Collapsible key={title} asChild className="group/collapsible">
			<SidebarMenuItem>
				<CollapsibleTrigger asChild>
					<Link href={url} className="w-full">
						<SidebarMenuButton
							tooltip={t(title)}
							className={`${url === currentPathname ? 'bg-primary-foreground' : ''}  hover:bg-primary-foreground  py-1 rounded-lg`}
						>
							{Icon && <Icon />}
							<span>{t(title)}</span>
						</SidebarMenuButton>
					</Link>
				</CollapsibleTrigger>
			</SidebarMenuItem>
		</Collapsible>
	)
}
