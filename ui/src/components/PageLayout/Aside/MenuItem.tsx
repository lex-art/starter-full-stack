import React, { ReactNode } from 'react'
import messages from '../../../locales/es/common.json'
import { Link } from '@/navigation'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import { useTranslations } from 'next-intl'
import StarBorder from '@mui/icons-material/StarBorder'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { ISubMenuRoute } from '@/lib/types/MenuRoute'

interface MenuItemProps {
	text: keyof typeof messages
	icon?: ReactNode
	link?: string
	setIsMenuOpen?(isMenuOpen: boolean): void
	index?: number
	submenu?: Array<ISubMenuRoute>
}

export default function MenuItem({ text, icon, link, index, submenu }: MenuItemProps) {
	const t = useTranslations('common')
	const [open, setOpen] = React.useState(true)

	const handleClick = () => {
		if (submenu) {
			setOpen(!open)
		} else {
			//TODO: Add navigation
		}
	}

	return (
		<>
			<ListItemButton onClick={handleClick} selected={!!link}>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText primary={t(text) + ' ' + index} />
				{submenu ? open ? <ExpandLess /> : <ExpandMore /> : null}
			</ListItemButton>
			{submenu && (
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{submenu.map((subMenu, index) => (
							<ListItemButton sx={{ pl: 4 }} key={subMenu.text}>
								<ListItemIcon>{subMenu.icon}</ListItemIcon>
								<ListItemText primary={t(subMenu.text) + ' ' + index} />
							</ListItemButton>
						))}
					</List>
				</Collapse>
			)}
		</>
	)
}
