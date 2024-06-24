import React from 'react'
import { Divider, styled, Theme, CSSObject, Drawer as DraweMobile } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import DraftsIcon from '@mui/icons-material/Drafts'
import ListMenu from './ListMenu'
import AppTypography from '@/components/Common/Typography/Typography'

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
	justifyContent: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar
}))

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(8)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`
	},
	scrollbarWidth: 'none', // Firefox
	'&::-webkit-scrollbar': {
		display: 'none' // Chrome, Safari, Opera
	}
})

const openedMixin = (theme: Theme, drawerWidth: number): CSSObject => ({
	width: `${drawerWidth}rem`,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.easeInOut,
		duration: theme.transitions.duration.enteringScreen
	}),
	overflowX: 'hidden',
	scrollbarWidth: 'none', // Firefox
	'&::-webkit-scrollbar': {
		display: 'none' // Chrome, Safari, Opera
	}
})

const Footer = styled('div')(({ theme }) => ({
	position: 'absolute',
	bottom: 0,
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: theme.spacing(1),
	backgroundColor: theme.palette.background.paper,
	borderTop: `1px solid ${theme.palette.divider}`
}))

export default function Aside({
	drawerWidth,
	window,
	mobileOpen,
	handleDrawerClose,
	handleDrawerTransitionEnd,
	open
}: AsideProps) {
	const container = window !== undefined ? () => window().document.body : undefined
	const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
		width: `${drawerWidth}rem`,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		position: 'relative',
		...(open && {
			...openedMixin(theme, drawerWidth),
			'& .MuiDrawer-paper': openedMixin(theme, drawerWidth)
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme)
		})
	}))

	return (
		<>
			<Drawer
				variant="permanent"
				open={open}
				sx={{
					display: { xs: 'none', sm: 'block' }
				}}
			>
				<DrawerHeader>
					<DraftsIcon fontSize="large" color="primary" />
				</DrawerHeader>
				<Divider />
				<ListMenu drawerWidth={drawerWidth} open={open} />
				<Footer>
					<AppTypography>© Footer</AppTypography>
				</Footer>
			</Drawer>
			{/* Mobile Version */}
			<DraweMobile
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
				<DrawerHeader>
					<DraftsIcon fontSize="large" color="primary" />
				</DrawerHeader>
				<Divider />
				<ListMenu drawerWidth={drawerWidth} handleDrawerClose={handleDrawerClose} open />
				<Footer>
					<AppTypography>© Footer</AppTypography>
				</Footer>
			</DraweMobile>
		</>
	)
}
