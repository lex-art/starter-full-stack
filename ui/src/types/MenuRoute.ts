import { USER_ROLE } from '@/lib/utilities/emun'
import { ReactNode } from 'react'
import messages from '../i18n/locales/es/common.json'

export interface ISubMenuRoute {
	text: keyof typeof messages
	link: string
	icon?: ReactNode
	rol?: Array<USER_ROLE>
}

export interface IMenuRoute {
	section?: keyof typeof messages
	text: keyof typeof messages
	link?: string
	rol?: Array<USER_ROLE>
	icon?: ReactNode
	defaultOpen?: boolean
	subMenu?: Array<ISubMenuRoute>
}
