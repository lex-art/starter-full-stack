import { ReactNode } from 'react'
import messages from '../../locales/es/common.json'
import { USER_ROLES } from '../utilities/emuns'

export interface IMenuRoute {
	text: keyof typeof messages
	link?: string
	rol?: Array<USER_ROLES>
	icon?: ReactNode
	subMenu?: Array<{
		text: keyof typeof messages
		link: string
		icon?: ReactNode
		rol: Array<USER_ROLES>
	}>
}
