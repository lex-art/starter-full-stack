import React, { ReactNode } from 'react'
import {
	Box,
	Drawer,
	Divider,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	ListSubheader,
	AppBar
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import DraftsIcon from '@mui/icons-material/Drafts'
import MenuItem from './MenuItem'

interface AsideProps {
	drawerWidth: number
	window?: () => Window
	mobileOpen: boolean
	handleDrawerTransitionEnd(): void
	handleDrawerClose(): void
}

const drawer: ReactNode = (
	<div>
		<AppBar
			position="sticky"
			variant="elevation"
			sx={{
				width: `25rem`,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '6.3rem'
			}}
		>
			<DraftsIcon fontSize="large" />
		</AppBar>
		<Divider />
		<List
			sx={{ width: '100%', maxWidth: `25rem`, bgcolor: 'background.paper' }}
			component="nav"
			aria-labelledby="nested-list-subheader"
			subheader={
				<ListSubheader component="div" id="nested-list-subheader">
					Nested List Items
				</ListSubheader>
			}
		>
			<ListItemButton>
				<ListItemIcon>
					<SendIcon />
				</ListItemIcon>
				<ListItemText primary="Sent mail" />
			</ListItemButton>
			<ListItemButton selected>
				<ListItemIcon>
					<DraftsIcon />
				</ListItemIcon>
				<ListItemText primary="Drafts" />
			</ListItemButton>
			<MenuItem />
		</List>
	</div>
)

export default function Aside({
	drawerWidth,
	window,
	mobileOpen,
	handleDrawerClose,
	handleDrawerTransitionEnd
}: AsideProps) {
	const container = window !== undefined ? () => window().document.body : undefined

	return (
		<Box
			component="nav"
			sx={{ width: { sm: `${drawerWidth}rem` }, flexShrink: { sm: 0 } }}
			aria-label="mailbox folders"
		>
			{/* Mobile Version */}
			<Drawer
				container={container}
				variant="temporary"
				open={mobileOpen}
				onTransitionEnd={handleDrawerTransitionEnd}
				onClose={handleDrawerClose}
				ModalProps={{
					keepMounted: true // Better open performance on mobile.
				}}
				sx={{
					display: { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: `${drawerWidth}rem` }
				}}
			>
				{drawer}
			</Drawer>

			{/*Descktop version */}
			<Drawer
				variant="permanent"
				sx={{
					display: { xs: 'none', sm: 'block' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: `${drawerWidth}rem` }
				}}
				open
			>
				{drawer}
			</Drawer>
		</Box>
	)
}
