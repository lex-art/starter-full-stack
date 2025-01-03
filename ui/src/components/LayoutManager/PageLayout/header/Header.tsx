'use client'
import AppStyledBadge from '@/components/Common/DataDisplay/Badge/Badge'
import AppIcons from '@/components/Common/Icons/Icons'
import AppIconButton from '@/components/Common/Inputs/IconButton/IconButton'
import AppBox from '@/components/Common/Layout/Box'
import AppMenuItem from '@/components/Common/Menu/MenuItem'
import AppMenuList from '@/components/Common/Menu/MenuList'
import { useAppTheme } from '@/components/Theme/appTheme.context'
import { usePathname, useRouter } from '@/i18n/routing'
import { ClickAwayListener } from '@mui/base/ClickAwayListener' // TODO: try to remove this import and use the one from '@mui/material'
import { Logout, PersonAdd } from '@mui/icons-material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MenuIcon from '@mui/icons-material/Menu'
import {
	Avatar,
	Box,
	IconButton,
	ListItemIcon,
	Paper,
	SxProps,
	Toolbar,
	Typography,
	styled,
	useTheme
} from '@mui/material'
import MuiAppBar, {
	AppBarProps as MuiAppBarProps
} from '@mui/material/AppBar'
import { deepOrange } from '@mui/material/colors'
import { useLocale, useTranslations } from 'next-intl'
import { FC, useState } from 'react'
import './style.css'

interface HeaderProps {
	drawerWidth: number
	handleDrawerToggle(): void
	open: boolean
	handleDrawerOpen(): void
	logOut(): void
}
interface AppBarProps extends MuiAppBarProps {
	open?: boolean
}

const styles: SxProps = {
	position: 'absolute',
	top: 45,
	right: 0,
	left: 20,
	zIndex: 1,
	width: 200,
	bgcolor: 'background.paper',
	overflow: 'visible',
	filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
	mt: 1.5,
	'& .MuiAvatar-root': {
		width: 32,
		height: 32,
		ml: -0.5,
		mr: 1
	},
	'&::before': {
		content: '""',
		display: 'block',
		position: 'absolute',
		top: 0,
		right: 14,
		width: 10,
		height: 10,
		bgcolor: 'background.paper',
		transform: 'translateY(-50%) rotate(45deg)',
		zIndex: 0
	}
}

const Header: FC<HeaderProps> = ({
	drawerWidth,
	handleDrawerToggle,
	open: openDrawer,
	handleDrawerOpen,
	logOut
}) => {
	const theme = useTheme()
	const t = useTranslations('common')
	const colorMode = useAppTheme()
	const locale = useLocale()
	const redirect = useRouter()
	const otherLocale = locale === 'es' ? 'en' : 'es'
	const pathname = usePathname()
	const avatar = 'https://avatars.githubusercontent.com/u/333?v=5'
	const username = 'John Doe'
	const [open, setOpen] = useState(false)

	const AppBar = styled(MuiAppBar, {
		shouldForwardProp: (prop) => prop !== 'open'
	})<AppBarProps>(({ theme, open }) => ({
		[theme.breakpoints.up('lg')]: {
			zIndex: theme.zIndex.drawer + 1
		},
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		width: `calc(100% - ${theme.spacing(8)})`,
		[theme.breakpoints.down('lg')]: {
			width: '100%'
		},
		...(open && {
			marginLeft: `${drawerWidth}rem`,
			width: `calc(100% - ${drawerWidth}rem)`,
			[theme.breakpoints.down('lg')]: {
				width: '100%'
			},
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen
			})
		})
	}))

	const getUserInitials = (name: string) => {
		const names = name.split(' ')
		const initials = names.map((name) => name[0]).join('')
		return initials.slice(0, 2).toUpperCase()
	}

	const handleClick = () => {
		setOpen((prev) => !prev)
	}

	const handleClickAway = () => {
		setOpen(false)
	}

	return (
		<AppBar position="fixed" open={openDrawer}>
			<Toolbar>
				<AppIconButton
					onClick={handleDrawerOpen}
					size="small"
					sx={{
						'&:hover': {
							backgroundColor: 'secondary.dark',
							color: 'white'
						},
						position: 'absolute',
						display: { lg: 'flex', xs: 'none' },
						backgroundColor: 'rgba(0, 0, 0, 0.04)',
						color: 'transparent',
						width: '3rem',
						height: '3rem',
						left: -15
					}}
				>
					{!openDrawer ? (
						<ChevronRightIcon fontSize="large" />
					) : (
						<ChevronLeftIcon fontSize="large" />
					)}
				</AppIconButton>
				<AppIconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={handleDrawerToggle}
					sx={{ mr: 2, display: { lg: 'none' } }}
				>
					<MenuIcon />
				</AppIconButton>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Mini variant drawer
				</Typography>
				<Box>
					<ClickAwayListener onClickAway={handleClickAway}>
						<AppBox sx={{ position: 'relative' }}>
							<AppIconButton
								sx={{ ml: 1 }}
								onClick={() =>
									redirect.push(pathname ?? '/', {
										locale: otherLocale
									})
								}
								color="inherit"
							>
								{locale === 'es' ? (
									<AppIcons.GTranslate />
								) : (
									<AppIcons.GTranslateRounded />
								)}
							</AppIconButton>
							<AppIconButton
								sx={{ ml: 1 }}
								onClick={() => {
									colorMode.toggleColorMode()
									window.localStorage.setItem(
										'colorMode',
										theme.palette.mode === 'dark' ? 'light' : 'dark'
									)
								}}
								color="inherit"
							>
								{theme.palette.mode === 'dark' ? (
									<AppIcons.Brightness4 />
								) : (
									<AppIcons.Brightness7 />
								)}
							</AppIconButton>
							<AppIconButton
								sx={{ ml: 1 }}
								onClick={logOut}
								color="inherit"
							>
								<AppIcons.Logout />
							</AppIconButton>
							<IconButton id="header" type="button" onClick={handleClick}>
								<AppStyledBadge
									overlap="circular"
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'right'
									}}
									variant="dot"
								>
									<Avatar
										sx={{ bgcolor: deepOrange[500] }}
										alt="User"
										src={avatar!}
										style={{ cursor: 'pointer' }}
									>
										{!avatar && getUserInitials(username)}
									</Avatar>
								</AppStyledBadge>
							</IconButton>
							{open ? (
								<Paper sx={styles}>
									<AppMenuList>
										<AppMenuItem>
											<Avatar
												sx={{ bgcolor: deepOrange[500] }}
												alt="User"
												src={avatar!}
											/>
											{t('profile')}
										</AppMenuItem>
										<AppMenuItem>
											<ListItemIcon>
												<PersonAdd fontSize="small" />
											</ListItemIcon>
											{t('settings')}
										</AppMenuItem>
										<AppMenuItem onClick={logOut}>
											<ListItemIcon>
												<Logout fontSize="small" />
											</ListItemIcon>
											{t('logout')}
										</AppMenuItem>
									</AppMenuList>
								</Paper>
							) : null}
						</AppBox>
					</ClickAwayListener>
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default Header
