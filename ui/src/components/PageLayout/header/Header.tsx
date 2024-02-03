import React from 'react'
import { Toolbar, IconButton, Typography, styled } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu'

interface HeaderProps {
	drawerWidth: number
	handleDrawerToggle(): void
	open: boolean
	handleDrawerOpen(): void
}
interface AppBarProps extends MuiAppBarProps {
	open?: boolean
}

export default function Header({ drawerWidth, handleDrawerToggle, open, handleDrawerOpen }: HeaderProps) {
	const AppBar = styled(MuiAppBar, {
		shouldForwardProp: (prop) => prop !== 'open'
	})<AppBarProps>(({ theme, open }) => ({
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		...(open && {
			marginLeft: `${drawerWidth}rem`,
			width: `calc(100% - ${drawerWidth}rem)`,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen
			})
		})
	}))
	return (
		<AppBar position="fixed" open={open}>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={handleDrawerOpen}
					edge="start"
					sx={{
						marginRight: 5,
						...(open && { display: 'none' })
					}}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" noWrap component="div">
					Mini variant drawer
				</Typography>
			</Toolbar>
		</AppBar>
	)
	/* return (
		<AppBar
			position="fixed"
			open={open}
			sx={{
				width: { sm: `calc(100% - ${drawerWidth}rem)` },
				ml: { sm: `${drawerWidth}rem` }
			}}
			variant="elevation"
		>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={handleDrawerToggle}
					sx={{ mr: 2, display: { sm: 'none' } }}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" noWrap component="div">
					Responsive drawer
				</Typography>
			</Toolbar>
		</AppBar>
	)*/
}
