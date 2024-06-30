'use client'
import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppButton from '@/components/Common/Inputs/Button/Button'
import AppBox from '@/components/Common/LAyout/Box'
import AppGrid from '@/components/Common/LAyout/Grid/Grid'
import AppPaper from '@/components/Common/LAyout/Paper'
import AppMenu from '@/components/Common/Menu/Menu'
import AppMenuItem from '@/components/Common/Menu/MenuItem'
import { AppMenuList } from '@/components/Common/Menu/MenuList'
import { MenuList } from '@mui/material'
import React, { useRef, useState } from 'react'

export default function Menus() {
	const [open, setOpen] = useState(false)
	const anchorRef = useRef<HTMLButtonElement>(null)
	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen)
	}

	const handleClose = (event: Event | React.SyntheticEvent) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
			return
		}

		setOpen(false)
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
					<AppBox gap={2} display="flex" flexWrap="wrap">
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
					</AppBox>
				</AppPaper>
			</AppGrid>
		</AppGrid>
	)
}
