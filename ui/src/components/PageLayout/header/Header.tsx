import React, { MouseEvent, useContext, useRef, useState } from 'react'
import {
	Toolbar,
	IconButton,
	Typography,
	styled,
	useTheme,
	Box,
	Avatar,
	PopoverOrigin,
	ListItemIcon,
	Popper,
	Grow,
	Paper,
	ClickAwayListener
} from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { ColorModeContext } from '@/components/Theme/AppTheme'
import AppIcons from '@/components/Common/Icons/Icons'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/navigation'
import { deepOrange } from '@mui/material/colors'
import AppMenu from '@/components/Common/Menu/Menu'
import AppMenuItem from '@/components/Common/Menu/MenuItem'
import AppIconButton from '@/components/Common/IconButton/IconButton'
import AppStyledBadge from '@/components/Common/Badge/Badge'
import AppDivider from '@/components/Common/Divider/Divider'
import { Logout, PersonAdd } from '@mui/icons-material'
const transformOrigin: PopoverOrigin | undefined = {
	vertical: 'bottom',
	horizontal: 'left'
}

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

export default function Header({
	drawerWidth,
	handleDrawerToggle,
	open,
	handleDrawerOpen,
	logOut
}: HeaderProps) {
	const theme = useTheme()
	const t = useTranslations('common')
	const colorMode = useContext(ColorModeContext)
	const locale = useLocale()
	const redirect = useRouter()
	const otherLocale = locale === 'es' ? 'en' : 'es'
	const pathname = usePathname()
	const avtar = `https://avatars.githubusercontent.com/u/333?v=5`
	const userName = 'John Doe'
	const anchorRef = useRef<HTMLButtonElement>(null)
	const [openMenu, setOpen] = useState(false)

	const handleToggle = () => {
		if (anchorRef.current) {
			setOpen((prevOpen) => !prevOpen)
		}
	}

	const handleClose = (event: Event | React.SyntheticEvent) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
			return
		}

		setOpen(false)
	}
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

	const getUserInitials = (name: string) => {
		const names = name.split(' ')
		const initials = names.map((name) => name[0]).join('')
		return initials.slice(0, 2).toUpperCase()
	}

	return (
		<AppBar position="fixed" open={open}>
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
						display: { sm: 'flex', xs: 'none' },
						backgroundColor: 'rgba(0, 0, 0, 0.04)',
						color: 'transparent',
						width: '3rem',
						height: '3rem',
						left: -15
					}}
				>
					{!open ? <ChevronRightIcon fontSize="large" /> : <ChevronLeftIcon fontSize="large" />}
				</AppIconButton>
				<AppIconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={handleDrawerToggle}
					sx={{ mr: 2, display: { sm: 'none' } }}
				>
					<MenuIcon />
				</AppIconButton>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Mini variant drawer
				</Typography>
				<Box>
					<AppIconButton
						sx={{ ml: 1 }}
						onClick={() =>
							redirect.push(pathname, {
								locale: otherLocale
							})
						}
						color="inherit"
					>
						{locale === 'es' ? <AppIcons.GTranslate /> : <AppIcons.GTranslateRounded />}
					</AppIconButton>
					<AppIconButton
						sx={{ ml: 1 }}
						onClick={() => {
							colorMode.toggleColorMode()
							window.localStorage.setItem('colorMode', theme.palette.mode === 'dark' ? 'light' : 'dark')
						}}
						color="inherit"
					>
						{theme.palette.mode === 'dark' ? <AppIcons.Brightness4 /> : <AppIcons.Brightness7 />}
					</AppIconButton>
					<IconButton sx={{ ml: 1 }} onClick={logOut} color="inherit">
						<AppIcons.Logout />
					</IconButton>
					<IconButton
						id="header-menu"
						ref={anchorRef}
						aria-controls={openMenu ? 'account-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={openMenu ? 'true' : undefined}
						onClick={handleToggle}
					>
						<AppStyledBadge
							overlap="circular"
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'right'
							}}
							variant="dot"
						>
							<Avatar sx={{ bgcolor: deepOrange[500] }} alt="User" src={avtar!} style={{ cursor: 'pointer' }}>
								{!avtar && getUserInitials(userName)}
							</Avatar>
						</AppStyledBadge>
					</IconButton>
					<Popper
						id="header-menu"
						open={openMenu}
						anchorEl={anchorRef.current}
						role={undefined}
						placement="bottom-start"
						transition
						disablePortal
					>
						{({ TransitionProps, placement }) => (
							<Grow
								{...TransitionProps}
								style={{
									transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom'
								}}
							>
								<Paper>
									<ClickAwayListener onClickAway={handleClose}>
										<>
											<AppMenuItem>
												<Avatar
													sx={{ bgcolor: deepOrange[500] }}
													alt="User"
													src={avtar!}
													style={{ cursor: 'pointer' }}
												>
													{!avtar && getUserInitials(userName)}
												</Avatar>
												{t('profile')}
											</AppMenuItem>
											<AppDivider />
											<AppMenuItem>{t('settings')}</AppMenuItem>
											<AppDivider />
											<AppMenuItem>
												<ListItemIcon>
													<PersonAdd fontSize="small" />
												</ListItemIcon>
												{t('profile')}
											</AppMenuItem>
											<AppMenuItem onClick={handleClose}>
												<ListItemIcon>
													<Logout fontSize="small" />
												</ListItemIcon>
												{t('logout')}
											</AppMenuItem>
										</>
									</ClickAwayListener>
								</Paper>
							</Grow>
						)}
					</Popper>
					{/* <AppMenu
						anchorEl={anchorEl}
						id="account-menu"
						open={openMenu}
						onClose={handleClose}
						onClick={handleClose}
						PaperProps={{
							elevation: 0,
							sx: {
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
						}}
						transformOrigin={{ horizontal: 'right', vertical: 'top' }}
						anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
					>
						<AppMenuItem>
							<Avatar sx={{ bgcolor: deepOrange[500] }} alt="User" src={avtar!} style={{ cursor: 'pointer' }}>
								{!avtar && getUserInitials(userName)}
							</Avatar>
							{t('profile')}
						</AppMenuItem>
						<AppDivider />
						<AppMenuItem>{t('settings')}</AppMenuItem>
						<AppDivider />
						<AppMenuItem>
							<ListItemIcon>
								<PersonAdd fontSize="small" />
							</ListItemIcon>
							{t('profile')}
						</AppMenuItem>
						<AppMenuItem onClick={handleClose}>
							<ListItemIcon>
								<Logout fontSize="small" />
							</ListItemIcon>
							{t('logout')}
						</AppMenuItem>
					</AppMenu> */}
				</Box>
			</Toolbar>
		</AppBar>
	)
}
