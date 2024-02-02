'use client'
import { ReactNode, useState } from 'react'
import LocaleSwitcher from '../LocaleSwitcher/LocaleSwitcher'
import Aside from './Aside/Aside'
import Header from './header/Header'
import { Box, Toolbar, Typography } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

type Props = {
	children?: ReactNode
}
const drawerWidth = 25

export default function PageLayout({ children }: Props) {
	const [mobileOpen, setMobileOpen] = useState(false)
	const [isClosing, setIsClosing] = useState(false)
	const handleDrawerClose = () => {
		setIsClosing(true)
		setMobileOpen(false)
	}

	const handleDrawerTransitionEnd = () => {
		setIsClosing(false)
	}

	const handleDrawerToggle = () => {
		if (!isClosing) {
			setMobileOpen(!mobileOpen)
		}
	}
	return (
		<Box sx={{ display: 'flex', height: '100%', minHeight: '100vh' }}>
			<CssBaseline />
			<Header drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
			<Aside
				drawerWidth={drawerWidth}
				mobileOpen={mobileOpen}
				handleDrawerClose={handleDrawerClose}
				handleDrawerTransitionEnd={handleDrawerTransitionEnd}
			/>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 2,
					pt: 10,
					width: { sm: `calc(100% - ${drawerWidth}rem)` },
					backgroundColor: '#f0f0f0'
				}}
			>
				{children}
			</Box>
		</Box>
	)
}
