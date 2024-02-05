import React, { useContext } from 'react'
import { Toolbar, IconButton, Typography, styled, useTheme, Box } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { ColorModeContext } from '@/components/Theme/AppTheme'
import { AppIcons } from '@/components/Common'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/navigation'

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
	const theme = useTheme()
	const colorMode = useContext(ColorModeContext)
	const locale = useLocale()
	const redirect = useRouter()
	const otherLocale = locale === 'es' ? 'en' : 'es'
	const pathname = usePathname()

	const AppBar = styled(MuiAppBar, {
		shouldForwardProp: (prop) => prop !== 'open'
	})<AppBarProps>(({ theme, open }) => ({
		[theme.breakpoints.up('sm')]: {
			zIndex: theme.zIndex.drawer + 1
		},
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		width: `calc(100% - ${theme.spacing(8)})`,
		[theme.breakpoints.down('sm')]: {
			width: `100%`
		},
		...(open && {
			marginLeft: `${drawerWidth}rem`,
			width: `calc(100% - ${drawerWidth}rem)`,
			[theme.breakpoints.down('sm')]: {
				width: `100%`
			},
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
					onClick={handleDrawerOpen}
					size="small"
					sx={{
						'&:hover': {
							backgroundColor: 'secondary.dark',
							color: 'white'
						},
						position: 'absolute',
						display: { sm: 'flex', xs: 'none' },
						backgroundColor: 'rgba(0, 0, 0, 0.04)',
						color: 'transparent',
						width: '3rem',
						height: '3rem',
						left: -15
					}}
				>
					{!open ? <ChevronRightIcon fontSize="large" /> : <ChevronLeftIcon fontSize="large" />}
				</IconButton>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={handleDrawerToggle}
					sx={{ mr: 2, display: { sm: 'none' } }}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Mini variant drawer
				</Typography>
				<Box>
					<IconButton
						sx={{ ml: 1 }}
						onClick={() =>
							redirect.push(pathname, {
								locale: otherLocale
							})
						}
						color="inherit"
					>
						{locale === 'es' ? <AppIcons.GTranslate /> : <AppIcons.GTranslateRounded />}
					</IconButton>
					<IconButton
						sx={{ ml: 1 }}
						onClick={() => {
							colorMode.toggleColorMode()
							window.localStorage.setItem('colorMode', theme.palette.mode === 'dark' ? 'light' : 'dark')
						}}
						color="inherit"
					>
						{theme.palette.mode === 'dark' ? <AppIcons.Brightness4 /> : <AppIcons.Brightness7 />}
					</IconButton>
				</Box>
			</Toolbar>
		</AppBar>
	)
}
