import { USER_ROLE } from '@/lib/emun'
import { type LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'
import { IMessagesKey } from './Messages'

interface IUser {
	name: string
	email: string
	avatar: string
}

interface IMenuNavSidebar {
	name: string
	logo: ReactNode
	plan: string
}

interface IMenuRoute {
	title: IMessagesKey
	url: string
	role?: Array<USER_ROLE>
	icon?: LucideIcon
	isActive?: boolean
	items?: Array<{
		title: IMessagesKey
		url: string
		role?: Array<USER_ROLE>
	}>
}

interface IMenuSidebar {
	section: IMessagesKey
	data: Array<IMenuRoute>
}

export type { IMenuNavSidebar, IMenuRoute, IMenuSidebar, IUser }
