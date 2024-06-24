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
				icon: <AppIcons.ControlPointOutlined />,
				link: '/elements/buttons'
			},
			{
				text: 'textFields',
				rol: [],
				icon: <AppIcons.TextFieldsOutlined />,
				link: '/elements/text-fields'
			},
			{
				text: 'selects',
				link: '#',
				icon: <AppIcons.SelectAllOutlined />
			},
			{
				text: 'checkboxes',
				link: '#',
				icon: <AppIcons.CheckBoxOutlined />
			},
			{
				text: 'radios',
				link: '#',
				icon: <AppIcons.RadioButtonUncheckedOutlined />
			},
			{
				text: 'icons',
				link: '#',
				icon: <AppIcons.AccessibilityNewOutlined />
			},
			{
				text: 'chips',
				link: '#',
				icon: <AppIcons.ChatOutlined />
			},
			{
				text: 'typography',
				link: '#',
				icon: <AppIcons.AbcOutlined />
			}
		]
	},
	{
		text: 'components',
		rol: [],
		icon: <AppIcons.CarRentalOutlined />,
		subMenu: [
			{
				text: 'cards',
				link: '#',
				icon: <AppIcons.CreditCardOutlined />
			},
			{
				text: 'tables',
				link: '#',
				icon: <AppIcons.TableChartOutlined />
			},
			{
				text: 'calendar',
				link: '#',
				icon: <AppIcons.DateRangeOutlined />
			},
			{
				text: 'modals',
				link: '#',
				icon: <AppIcons.DraftsOutlined />
			},
			{
				text: 'uploadFile',
				link: '#',
				icon: <AppIcons.FileUploadOutlined />
			},
			{
				text: 'forms',
				link: '#',
				icon: <AppIcons.ChecklistOutlined />
			},
			{
				text: 'skeleton',
				link: '#',
				icon: <AppIcons.Face2Outlined />
			},
			{
				text: 'snackbar',
				link: '#',
				icon: <AppIcons.NotificationAddOutlined />
			}
		]
	}
]
