import React, { ReactNode } from 'react'
import messages from '../../../locales/es/common.json'
import { Link } from '@/navigation'
import { useTheme } from '@mui/material'
import { useTranslations } from 'next-intl'

interface MenuItemProps {
	text: keyof typeof messages
	icon?: ReactNode
	link?: string
	children?: ReactNode
	setIsMenuOpen?(isMenuOpen: boolean): void
	isSubItem?: boolean
	isOpenMenu?: boolean
	index?: number
}

export default function MenuItem({ text, link }: MenuItemProps) {
	const t = useTranslations('common')
	return (
		<li>
			<Link href={link ?? '#'}>{t(text)}</Link>
		</li>
	)
}
