'use client'
import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppIcons from '@/components/Common/Icons/Icons'
import AppIconButton from '@/components/Common/Inputs/IconButton/IconButton'
import AppBox from '@/components/Common/Layout/Box'
import AppMenu from '@/components/Common/Menu/Menu'
import AppMenuItem from '@/components/Common/Menu/MenuItem'
import { AppMenuList } from '@/components/Common/Menu/MenuList'
import { ColorModeContext } from '@/components/Theme/AppTheme'
import { alpha, AppBar, Avatar, InputBase, styled, Toolbar, useTheme } from '@mui/material'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/navigation'
import { FC, useState, MouseEvent, useContext } from 'react'
import MenuItem from '../PageLayout/Aside/MenuItem'
import { signOut } from 'next-auth/react'
import { MENU_ROUTES } from '../PageLayout/Aside/menuRoutes'

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	height: '3.5rem', // Ajustando la altura del Search
	display: 'flex', // Para centrar verticalmente el contenido
	alignItems: 'center', // Para centrar verticalmente el contenido
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25)
	},
	marginLeft: 0,
	width: '100%',
	//minWidth: '20rem', // Ajustando el ancho del Search
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto'
	}
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	width: '100%',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		height: '3.5rem', // Ajustando la altura del input
		boxSizing: 'border-box', // Asegurando que el padding y la altura se calculen correctamente
		transition: theme.transitions.create('width'),
		[theme.breakpoints.up('sm')]: {
			width: '18ch',
			'&:focus': {
				width: '25ch'
			}
		}
	}
}))

export const Header: FC = () => {
	const theme = useTheme()
	const pathname = usePathname()
	const t = useTranslations('common')
	const colorMode = useContext(ColorModeContext)
	const locale = useLocale()
	const otherLocale = locale === 'es' ? 'en' : 'es'
	const redirect = useRouter()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	const logOut = () => {
		signOut()
	}

	return (
		<AppBox gridArea="header">
			<AppBar position="static">
				<Toolbar>
					<AppIconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="open drawer"
						sx={{ mr: 2 }}
						id="positioned-button"
						aria-controls={open ? 'demo-positioned-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}
					>
						<AppIcons.Menu />
					</AppIconButton>
					<AppMenu
						id="positioned-menu"
						aria-labelledby="demo-positioned-button"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						elevation={0}
						sx={{
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
								top: 59,
								left: 25,
								width: 10,
								height: 10,
								bgcolor: 'background.paper',
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 0
							}
						}}
						transformOrigin={{ horizontal: 'right', vertical: 'top' }}
						anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
					>
						<AppMenuList>
							<AppMenuItem>
								<Avatar />
								<AppTypography variant="body1">Me</AppTypography>
							</AppMenuItem>
							<AppMenuItem>
								<AppIcons.Home />
								<AppTypography variant="body1">Home</AppTypography>
							</AppMenuItem>
							<AppDivider />
							{MENU_ROUTES.filter((route) => {
								//TODO: Add validation for roles
								return route
							}).map((route, index) => (
								<MenuItem
									key={route.text + index}
									index={index}
									text={route.text}
									icon={route.icon}
									link={route.link}
									submenu={route.subMenu}
									openAside={open}
									handleDrawerClose={() => {}}
									section={route.section}
									defaultOpen={route.defaultOpen}
								/>
							))}
						</AppMenuList>
					</AppMenu>
					<AppBox sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
						<AppTypography variant="h4" noWrap component="div">
							MUI
						</AppTypography>
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
						<AppIconButton sx={{ ml: 1 }} onClick={logOut} color="inherit">
							<AppIcons.Logout />
						</AppIconButton>
					</AppBox>
					<Search>
						<SearchIconWrapper>
							<AppIcons.Search />
						</SearchIconWrapper>
						<StyledInputBase placeholder={`${t('search')}...`} inputProps={{ 'aria-label': 'search' }} />
					</Search>
				</Toolbar>
			</AppBar>
		</AppBox>
	)
}
