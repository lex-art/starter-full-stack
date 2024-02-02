import React, { ReactNode } from 'react'
import messages from '../../../locales/es/common.json'
import { Link } from '@/navigation'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import { useTranslations } from 'next-intl'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import StarBorder from '@mui/icons-material/StarBorder'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

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

export default function MenuItem() {
	const t = useTranslations('common')
	const [open, setOpen] = React.useState(true)

	const handleClick = () => {
		setOpen(!open)
	}

	return (
		<>
			<ListItemButton onClick={handleClick}>
				<ListItemIcon>
					<InboxIcon />
				</ListItemIcon>
				<ListItemText primary="Inbox" />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItemButton sx={{ pl: 4 }}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Starred" />
					</ListItemButton>
				</List>
			</Collapse>
		</>
	)
}
