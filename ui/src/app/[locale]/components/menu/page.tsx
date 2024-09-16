'use client'
import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppButton from '@/components/Common/Inputs/Button/Button'
import AppBox from '@/components/Common/Layout/Box'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import AppPaper from '@/components/Common/Layout/Paper'
import AppListItem from '@/components/Common/Menu/ListMenu/ListItem'
import AppMenu from '@/components/Common/Menu/Menu'
import AppMenuItem from '@/components/Common/Menu/MenuItem'
import { AppMenuList } from '@/components/Common/Menu/MenuList'
import { Logout, PersonAdd } from '@mui/icons-material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Avatar, IconButton } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import React, { useRef, useState } from 'react'

const options = [
	'None',
	'Atria',
	'Callisto',
	'Dione',
	'Ganymede',
	'Hangouts Call',
	'Luna',
	'Oberon',
	'Phobos',
	'Pyxis',
	'Sedna',
	'Titania',
	'Triton',
	'Umbriel'
]

const ITEM_HEIGHT = 48

export default function Menus() {
	const [open, setOpen] = useState(false)
	const [open2, setOpen2] = useState(false)
	const [open3, setOpen3] = useState(false)
	const anchorRef = useRef<HTMLButtonElement>(null)
	const anchorRef2 = useRef<HTMLButtonElement>(null)
	const anchorRef3 = useRef<HTMLButtonElement>(null)
	const [contextMenu, setContextMenu] = React.useState<{
		mouseX: number
		mouseY: number
	} | null>(null)

	const handleContextMenu = (event: React.MouseEvent) => {
		event.preventDefault()
		setContextMenu(
			contextMenu === null
				? {
						mouseX: event.clientX + 2,
						mouseY: event.clientY - 6
					}
				: // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
					// Other native context menus might behave different.
					// With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
					null
		)
	}

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen)
	}
	const handleToggle2 = () => {
		setOpen2((prevOpen) => !prevOpen)
	}

	const handleToggle3 = () => {
		setOpen3((prevOpen) => !prevOpen)
	}

	const handleClose = (event: Event | React.SyntheticEvent) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
			return
		}
		setOpen(false)
	}

	const handleClose2 = (event: Event | React.SyntheticEvent) => {
		if (anchorRef2.current && anchorRef2.current.contains(event.target as HTMLElement)) {
			return
		}
		setOpen2(false)
	}

	const handleClose3 = (event: Event | React.SyntheticEvent) => {
		if (anchorRef3.current && anchorRef3.current.contains(event.target as HTMLElement)) {
			return
		}
		setOpen3(false)
	}

	const handleCloseContextMenu = () => {
		setContextMenu(null)
	}

	return (
		<AppGrid item width="100%">
			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography variant="subtitle2">Menus</AppTypography>
			</AppDivider>
			<AppGrid container display="grid" gap="2rem">
				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTypography variant="body1" fontWeight="bold">
						Menu types
					</AppTypography>
					<AppBox gap={2} display="flex" flexWrap="wrap" alignItems="center">
						<AppButton
							ref={anchorRef}
							variant="text"
							id="composition-button"
							aria-controls={open ? 'composition-menu' : undefined}
							aria-expanded={open ? 'true' : undefined}
							aria-haspopup="true"
							onClick={handleToggle}
						>
							Menu example
						</AppButton>
						<AppMenu anchorEl={anchorRef.current} open={open} onClose={handleClose}>
							<AppMenuList>
								<AppMenuItem>Item 1</AppMenuItem>
							</AppMenuList>
						</AppMenu>
						<IconButton
							id="header-menu2"
							ref={anchorRef2}
							aria-controls={open2 ? 'account-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open2 ? 'true' : undefined}
							onClick={handleToggle2}
						>
							<Avatar sx={{ bgcolor: deepOrange[500] }} style={{ cursor: 'pointer' }}>
								OC
							</Avatar>
						</IconButton>
						<AppMenu
							anchorEl={anchorRef2.current}
							id="account-menu2"
							open={open2}
							onClose={handleClose2}
							onClick={handleClose2}
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
							anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
						>
							<AppMenuItem>
								<Avatar sx={{ bgcolor: deepOrange[500] }} style={{ cursor: 'pointer' }}>
									OC
								</Avatar>
								Profile
							</AppMenuItem>
							<AppDivider />
							<AppMenuItem>Settings</AppMenuItem>
							<AppDivider />
							<AppMenuItem>
								<AppListItem>
									<PersonAdd fontSize="small" />
								</AppListItem>
								Profile
							</AppMenuItem>
							<AppMenuItem onClick={handleClose}>
								<AppListItem>
									<Logout fontSize="small" />
								</AppListItem>
								LogOut
							</AppMenuItem>
						</AppMenu>

						<IconButton
							id="header-menu3"
							ref={anchorRef3}
							aria-controls={open3 ? 'account-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open3 ? 'true' : undefined}
							onClick={handleToggle3}
							sx={{ height: '4rem', width: '4rem' }}
						>
							<MoreVertIcon />
						</IconButton>
						<AppMenu
							anchorEl={anchorRef3.current}
							id="account-menu3"
							open={open3}
							onClose={handleClose3}
							onClick={handleClose3}
							MenuListProps={{
								'aria-labelledby': 'long-button'
							}}
							PaperProps={{
								style: {
									maxHeight: ITEM_HEIGHT * 10,
									width: '30ch'
								}
							}}
							transformOrigin={{ horizontal: 'right', vertical: 'top' }}
							anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
						>
							{options.map((option) => (
								<AppMenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose3}>
									{option}
								</AppMenuItem>
							))}
						</AppMenu>
					</AppBox>
				</AppPaper>
				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTypography variant="body1" fontWeight="bold">
						Menu context
					</AppTypography>
					<div onContextMenu={handleContextMenu} style={{ cursor: 'context-menu' }}>
						<AppTypography>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ipsum purus, bibendum sit amet
							vulputate eget, porta semper ligula. Donec bibendum vulputate erat, ac fringilla mi finibus nec.
							Donec ac dolor sed dolor porttitor blandit vel vel purus. Fusce vel malesuada ligula. Nam quis
							vehicula ante, eu finibus est. Proin ullamcorper fermentum orci, quis finibus massa. Nunc
							lobortis, massa ut rutrum ultrices, metus metus finibus ex, sit amet facilisis neque enim sed
							neque. Quisque accumsan metus vel maximus consequat. Suspendisse lacinia tellus a libero
							volutpat maximus.
						</AppTypography>
						<AppMenu
							open={contextMenu !== null}
							onClose={handleClose}
							anchorReference="anchorPosition"
							anchorPosition={
								contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
							}
						>
							<AppMenuItem onClick={handleCloseContextMenu}>Copy</AppMenuItem>
							<AppMenuItem onClick={handleCloseContextMenu}>Print</AppMenuItem>
							<AppMenuItem onClick={handleCloseContextMenu}>Highlight</AppMenuItem>
							<AppMenuItem onClick={handleCloseContextMenu}>Email</AppMenuItem>
						</AppMenu>
					</div>
				</AppPaper>
			</AppGrid>
		</AppGrid>
	)
}
