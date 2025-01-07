'use client'

import { USER_ROLE } from '@/lib/emun'
import { IMenuSidebar } from '@/types/Menu-sidebar'
import {
	Command,
	Frame,
	GalleryVerticalEnd,
	SquareTerminal
} from 'lucide-react'

export const menuRoutes: Array<IMenuSidebar> = [
	{
		section: 'common.menu',
		data: [
			{
				role: [],
				title: 'common.dashboard',
				url: '/dashboard',
				icon: SquareTerminal,
				isActive: true
			}
		]
	},
	{
		section: 'common.userModule',
		data: [
			{
				role: [USER_ROLE.SUPER_ADMIN],
				title: 'common.users',
				url: '/user/list',
				icon: GalleryVerticalEnd,
				items: [
					{
						role: [USER_ROLE.SUPER_ADMIN],
						title: 'common.list',
						url: '/user/list'
					},
					{
						role: [USER_ROLE.SUPER_ADMIN],
						title: 'common.add',
						url: '/user/create'
					}
				]
			}
		]
	},
	{
		section: 'common.uiComponents',
		data: [
			{
				role: [],
				title: 'common.elements',
				url: '#',
				icon: Command,
				isActive: true,
				items: [
					{
						role: [],
						title: 'common.buttons',
						url: '/elements/buttons'
					},
					{
						role: [],
						title: 'common.textFields',
						url: '/elements/text-fields'
					},
					{
						role: [],
						title: 'common.selects',
						url: '/elements/selects'
					},
					{
						role: [],
						title: 'common.checkboxes',
						url: '/elements/checkboxes'
					},
					{
						role: [],
						title: 'common.calendar',
						url: '/elements/calendar'
					},
					{
						role: [],
						title: 'common.icons',
						url: '/elements/icons'
					},
					{
						role: [],
						title: 'common.badge',
						url: '/elements/badge'
					},
					{
						role: [],
						title: 'common.typography',
						url: '/elements/typography'
					}
				]
			},
			{
				role: [],
				title: 'common.components',
				url: '#',
				icon: Frame,
				items: [
					{
						role: [],
						title: 'common.cards',
						url: '/components/cards'
					},
					{
						role: [],
						title: 'common.menu',
						url: '/components/menu'
					},
					{
						role: [],
						title: 'common.tables',
						url: '/components/tables'
					},
					{
						role: [],
						title: 'common.tabs',
						url: '/components/tabs'
					},
					{
						role: [],
						title: 'common.modals',
						url: '/components/modals'
					},
					{
						role: [],
						title: 'common.uploadFile',
						url: '/components/upload-file'
					},
					{
						role: [],
						title: 'common.forms',
						url: '/components/forms'
					},
					{
						role: [],
						title: 'common.toast',
						url: '/components/toast'
					},
					{
						role: [],
						title: 'common.skeleton',
						url: '/components/skeleton'
					},
					{
						role: [],
						title: 'common.editors',
						url: '/components/editors'
					},
					{
						role: [],
						title: 'common.dragAndDrop',
						url: '/components/drag-and-drop'
					}
				]
			}
		]
	}
]
