import { PopoverOrigin } from '@mui/material'
import { Dispatch, FC, MouseEvent, SetStateAction, useEffect, useState } from 'react'
import AppGrid from '../Common/Grid/Grid'
import AppIconButton from '../Common/IconButton/IconButton'
import AppMenu from '../Common/Menu/Menu'
import AppMenuItem from '../Common/Menu/MenuItem'

const transformOrigin: PopoverOrigin | undefined = {
	vertical: 'top',
	horizontal: 'right'
}

export interface AppMenuOptionsProps {
	dataItems: Array<{
		onClick: () => void
		text: string
		disabled?: boolean
	}>
	button: JSX.Element
	closeMenu?: boolean
	setCloseMenu?: Dispatch<SetStateAction<boolean>>
}

export const AppMenuOptions: FC<AppMenuOptionsProps> = ({ dataItems, button, closeMenu, setCloseMenu }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	useEffect(() => {
		if (closeMenu && setCloseMenu) {
			handleClose()
			setCloseMenu(false)
		}
	}, [closeMenu, setCloseMenu])

	return (
		<AppGrid>
			<AppIconButton
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				{button}
			</AppIconButton>
			<AppMenu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button'
				}}
				transformOrigin={transformOrigin}
			>
				{dataItems.map((item, index) => (
					<AppMenuItem key={index} onClick={item.onClick} disabled={item.disabled}>
						{item.text}
					</AppMenuItem>
				))}
			</AppMenu>
		</AppGrid>
	)
}
