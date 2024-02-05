import React, { ReactNode } from 'react'
import messages from '../../../locales/es/common.json'
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import { useTranslations } from 'next-intl'
import { ISubMenuRoute } from '@/lib/types/MenuRoute'
import Icons from '@/components/Common/Icons/Icons'

interface MenuItemProps {
	text: keyof typeof messages
	icon?: ReactNode
	link?: string
	setIsMenuOpen?(isMenuOpen: boolean): void
	index?: number
	submenu?: Array<ISubMenuRoute>
	openAside?: boolean
	handleDrawerClose?(): void
}

export default function MenuItem({
	text,
	icon,
	link,
	index,
	submenu,
	openAside,
	handleDrawerClose
}: MenuItemProps) {
	const t = useTranslations('common')
	const [open, setOpen] = React.useState(true)

	const handleClick = () => {
		if (submenu) {
			setOpen(!open)
		} else {
			handleDrawerClose && handleDrawerClose()
			//TODO: Add navigation
		}
	}

	return (
		<ListItem disablePadding sx={{ display: 'block' }}>
			<ListItemButton
				sx={{
					minHeight: 48,
					justifyContent: openAside ? 'initial' : 'center',
					px: 2.5
				}}
				onClick={handleClick}
				selected={!!link}
			>
				<ListItemIcon
					sx={{
						minWidth: 0,
						mr: openAside ? 3 : 'auto',
						justifyContent: 'center'
					}}
				>
					{icon}
				</ListItemIcon>
				<ListItemText primary={t(text) + ' ' + index} sx={{ opacity: openAside ? 1 : 0 }} />
				{submenu && openAside ? open ? <Icons.ExpandLess /> : <Icons.ExpandMore /> : null}
			</ListItemButton>
			{submenu && (
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{submenu.map((subMenu, index) => (
							<ListItemButton
								sx={{
									pl: openAside ? 5 : 3,
									minHeight: 48,
									backgroundColor: 'rgba(0, 0, 0, 0.04)',
									justifyContent: openAside ? 'initial' : 'center'
								}}
								key={'sub-' + subMenu.text + index}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: openAside ? 3 : 'auto',
										justifyContent: 'center'
									}}
								>
									{subMenu.icon}
								</ListItemIcon>
								<ListItemText primary={t(subMenu.text) + ' ' + index} sx={{ opacity: openAside ? 1 : 0 }} />
							</ListItemButton>
						))}
					</List>
				</Collapse>
			)}
		</ListItem>
	)
}
