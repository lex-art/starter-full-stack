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
				icon: <AppIcons.ControlPointOutlined fontSize="small" />,
				link: '/elements/buttons'
			},
			{
				text: 'textFields',
				rol: [],
				icon: <AppIcons.TextFieldsOutlined fontSize="small" />,
				link: '/elements/text-fields'
			},
			{
				text: 'selects',
				link: '#',
				icon: <AppIcons.SelectAllOutlined fontSize="small" />
			},
			{
				text: 'checkboxes',
				link: '#',
				icon: <AppIcons.CheckBoxOutlined fontSize="small" />
			},
			{
				text: 'radios',
				link: '#',
				icon: <AppIcons.RadioButtonUncheckedOutlined fontSize="small" />
			},
			{
				text: 'icons',
				link: '#',
				icon: <AppIcons.AccessibilityNewOutlined fontSize="small" />
			},
			{
				text: 'chips',
				link: '#',
				icon: <AppIcons.ChatOutlined fontSize="small" />
			},
			{
				text: 'typography',
				link: '#',
				icon: <AppIcons.AbcOutlined fontSize="small" />
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
				icon: <AppIcons.CreditCardOutlined fontSize="small" />
			},
			{
				text: 'tables',
				link: '#',
				icon: <AppIcons.TableChartOutlined fontSize="small" />
			},
			{
				text: 'calendar',
				link: '#',
				icon: <AppIcons.DateRangeOutlined fontSize="small" />
			},
			{
				text: 'modals',
				link: '#',
				icon: <AppIcons.DraftsOutlined fontSize="small" />
			},
			{
				text: 'uploadFile',
				link: '#',
				icon: <AppIcons.FileUploadOutlined fontSize="small" />
			},
			{
				text: 'forms',
				link: '#',
				icon: <AppIcons.ChecklistOutlined fontSize="small" />
			},
			{
				text: 'skeleton',
				link: '#',
				icon: <AppIcons.Face2Outlined fontSize="small" />
			},
			{
				text: 'snackbar',
				link: '#',
				icon: <AppIcons.NotificationAddOutlined fontSize="small" />
			}
		]
	}
]
