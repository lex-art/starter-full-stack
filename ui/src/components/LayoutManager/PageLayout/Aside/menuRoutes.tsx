import AppIcons from '@/components/Common/Icons/Icons'
import { USER_ROLE } from '@/lib/utilities/emun'
import { IMenuRoute } from '@/types/MenuRoute'

export const MENU_ROUTES: Array<IMenuRoute> = [
	{
		section: 'menu',
		text: 'components',
		rol: [],
		link: '/',
		icon: <AppIcons.Home />
	},
	{
		section: 'userModule',
		text: 'users',
		defaultOpen: true,
		rol: [USER_ROLE.SUPER_ADMIN],
		icon: <AppIcons.PeopleAltOutlined />,
		subMenu: [
			{
				text: 'list',
				link: '/user/list',
				icon: <AppIcons.ListOutlined fontSize="small" color="primary" />
			},
			{
				text: 'add',
				link: '/user/create',
				icon: <AppIcons.PersonAddOutlined fontSize="small" color="primary" />
			}
		]
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
				link: '/components/modals',
				icon: <AppIcons.DraftsOutlined fontSize="small" color="primary" />
			},
			{
				text: 'uploadFile',
				link: '/components/upload-file',
				icon: <AppIcons.FileUploadOutlined fontSize="small" color="primary" />
			},
			{
				text: 'forms',
				link: '/components/forms',
				icon: <AppIcons.ChecklistOutlined fontSize="small" color="primary" />
			},
			{
				text: 'skeleton',
				link: '/components/skeleton',
				icon: <AppIcons.Face2Outlined fontSize="small" color="primary" />
			},
			{
				text: 'snackbar',
				link: '/components/snackbar',
				icon: <AppIcons.NotificationAddOutlined fontSize="small" color="primary" />
			},
			{
				text: 'editors',
				link: '/components/editor',
				icon: <AppIcons.EditOutlined fontSize="small" color="primary" />
			},
			{
				text: 'dragAndDrop',
				link: '/components/drag-and-drop',
				icon: <AppIcons.DragHandleOutlined fontSize="small" color="primary" />
			}
		]
	}
]
