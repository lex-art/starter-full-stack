import { AppIcons } from '@/components/Common'
import { IMenuRoute } from '@/lib/types/MenuRoute'

export const MENU_ROUTES: Array<IMenuRoute> = [
	{
		text: 'home',
		rol: [],
		link: '#',
		icon: <AppIcons.Home />
	},
	{
		text: 'user',
		rol: [],
		icon: <AppIcons.Home />,
		subMenu: [
			{
				text: 'home',
				rol: [],
				icon: <AppIcons.Settings />,
				link: '#'
			},
			{
				text: 'home',
				rol: [],
				icon: <AppIcons.Pages />,
				link: '#'
			}
		]
	}
]
