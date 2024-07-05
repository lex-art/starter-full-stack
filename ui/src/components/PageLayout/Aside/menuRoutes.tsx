import AppIcons from '@/components/Common/Icons/Icons'
import { IMenuRoute } from '@/lib/types/MenuRoute'

export const MENU_ROUTES: Array<IMenuRoute> = [
	{
		section: 'menu',
		text: 'components',
		rol: [],
		link: '/catalogue',
		icon: <AppIcons.Home />
	},
	{
		section: 'uiComponents',
		text: 'elements',
		rol: [],
		icon: <AppIcons.DiamondOutlined />,
		subMenu: [
			{
				text: 'buttons',
				rol: [],
				icon: <AppIcons.ControlPointOutlined fontSize="small" color="primary" />,
				link: '/elements/buttons'
			},
			{
				text: 'textFields',
				rol: [],
				icon: <AppIcons.TextFieldsOutlined fontSize="small" color="primary" />,
				link: '/elements/text-fields'
			},
			{
				text: 'selects',
				link: '/elements/selects',
				icon: <AppIcons.SelectAllOutlined fontSize="small" color="primary" />
			},
			{
				text: 'checkboxes',
				link: '/elements/checkboxes',
				icon: <AppIcons.CheckBoxOutlined fontSize="small" color="primary" />
			},
			{
				text: 'calendar',
				link: '/elements/calendar',
				icon: <AppIcons.CalendarMonth fontSize="small" color="primary" />
			},
			{
				text: 'icons',
				link: '/elements/icons',
				icon: <AppIcons.AccessibilityNewOutlined fontSize="small" color="primary" />
			},
			{
				text: 'chips',
				link: '/elements/chips',
				icon: <AppIcons.ChatOutlined fontSize="small" color="primary" />
			},
			{
				text: 'typography',
				link: '/elements/typography',
				icon: <AppIcons.AbcOutlined fontSize="small" color="primary" />
			}
		]
	},
	{
		text: 'components',
		rol: [],
		defaultOpen: true,
		icon: <AppIcons.CarRentalOutlined />,
		subMenu: [
			{
				text: 'cards',
				link: '/components/cards',
				icon: <AppIcons.CreditCardOutlined fontSize="small" color="primary" />
			},
			{
				text: 'menu',
				link: '/components/menu',
				icon: <AppIcons.MenuOutlined fontSize="small" color="primary" />
			},
			{
				text: 'tables',
				link: '/components/tables',
				icon: <AppIcons.TableChartOutlined fontSize="small" color="primary" />
			},
			{
				text: 'tabs',
				link: '/components/tabs',
				icon: <AppIcons.TabOutlined fontSize="small" color="primary" />
			},
			{
				text: 'modals',
				link: '#',
				icon: <AppIcons.DraftsOutlined fontSize="small" color="primary" />
			},
			{
				text: 'uploadFile',
				link: '#',
				icon: <AppIcons.FileUploadOutlined fontSize="small" color="primary" />
			},
			{
				text: 'forms',
				link: '#',
				icon: <AppIcons.ChecklistOutlined fontSize="small" color="primary" />
			},
			{
				text: 'skeleton',
				link: '#',
				icon: <AppIcons.Face2Outlined fontSize="small" color="primary" />
			},
			{
				text: 'snackbar',
				link: '#',
				icon: <AppIcons.NotificationAddOutlined fontSize="small" color="primary" />
			}
		]
	}
]
