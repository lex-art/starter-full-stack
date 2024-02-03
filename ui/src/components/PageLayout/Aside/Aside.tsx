import React, { ReactNode } from 'react'
import {
	Box,
	Divider,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	ListSubheader,
	AppBar,
	styled,
	Theme,
	CSSObject,
	useTheme,
	ListItem
} from '@mui/material'
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import MuiDrawer from '@mui/material/Drawer'
import DraftsIcon from '@mui/icons-material/Drafts'
import MenuItem from './MenuItem'
import { AppIcons } from '@/components/Common'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { MENU_ROUTES } from './menuRoutes'

interface AsideProps {
	drawerWidth: number
	window?: () => Window
	mobileOpen: boolean
	handleDrawerTransitionEnd(): void
	handleDrawerClose(): void
	open: boolean
}

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar
}))

const drawer: ReactNode = (
	<div>
		<AppBar
			position="sticky"
			variant="elevation"
			sx={{
				width: `100%`,
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
			{MENU_ROUTES.filter((route) => {
				//TODO: Add validation for roles
				return route
			}).map((route, index) => (
				<MenuItem
					key={route.text}
					index={index}
					text={route.text}
					icon={route.icon}
					link={route.link}
					submenu={route.subMenu}
				/>
			))}
		</List>
	</div>
)

export default function Aside({
	drawerWidth,
	window,
	mobileOpen,
	handleDrawerClose,
	handleDrawerTransitionEnd,
	open
}: AsideProps) {
	const theme = useTheme()
	const container = window !== undefined ? () => window().document.body : undefined
	const openedMixin = (theme: Theme): CSSObject => ({
		width: `${drawerWidth}rem`,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		}),
		overflowX: 'hidden'
	})

	const closedMixin = (theme: Theme): CSSObject => ({
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: 'hidden',
		width: `calc(${theme.spacing(7)} + 1px)`,
		[theme.breakpoints.up('sm')]: {
			width: `calc(${theme.spacing(8)} + 1px)`
		}
	})
	const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
		width: `${drawerWidth}rem`,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...(open && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme)
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme)
		})
	}))
	return (
		<Drawer variant="permanent" open={open}>
			<DrawerHeader>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<List>
				{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
					<ListItem key={text} disablePadding sx={{ display: 'block' }}>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : 'auto',
									justifyContent: 'center'
								}}
							>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{['All mail', 'Trash', 'Spam'].map((text, index) => (
					<ListItem key={text} disablePadding sx={{ display: 'block' }}>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : 'auto',
									justifyContent: 'center'
								}}
							>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Drawer>
	)

	/* return (
		<Box
			component="nav"
			sx={{ width: { sm: `${drawerWidth}rem` }, flexShrink: { sm: 0 } }}
			aria-label="mailbox folders"
		>
			{/* Mobile Version 
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

			{/*Descktop version 
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
	) */
}
