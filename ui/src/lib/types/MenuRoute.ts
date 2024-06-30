import { ReactNode } from 'react'
import messages from '../../locales/es/common.json'
import { USER_ROLES } from '../utilities/emuns'

export interface ISubMenuRoute {
	text: keyof typeof messages
	link: string
	icon?: ReactNode
	rol?: Array<USER_ROLES>
}

export interface IMenuRoute {
	section?: keyof typeof messages
	text: keyof typeof messages
	link?: string
	rol?: Array<USER_ROLES>
	icon?: ReactNode
	defaultOpen?: boolean
	subMenu?: Array<ISubMenuRoute>
}
