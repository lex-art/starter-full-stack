import { AppIcons } from '@/components/Common'
import { IMenuRoute } from '@/lib/types/MenuRoute'

export const MENU_ROUTES: Array<IMenuRoute> = [
	{
		text: 'item',
		rol: [],
		link: '#',
		icon: <AppIcons.Home />
	},
	{
		text: 'item',
		rol: [],
		icon: <AppIcons.Send />,
		subMenu: [
			{
				text: 'item',
				rol: [],
				icon: <AppIcons.Settings />,
				link: '#'
			},
			{
				text: 'item',
				rol: [],
				icon: <AppIcons.Pages />,
				link: '#'
			}
		]
	}
]
