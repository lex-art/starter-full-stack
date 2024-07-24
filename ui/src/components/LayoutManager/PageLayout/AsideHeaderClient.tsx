'use client'
import React, { useContext, useState } from 'react'
import { Header } from './header/Header'
import { Aside } from './Aside/Aside'
import { signOut } from 'next-auth/react'
import AppLoader from '@/components/Loader/Loader'
import { AppGlobalContext } from '@/components/Theme/AppTheme'

interface AsideHeaderClientProps {
	readonly drawerWidth: number
	readonly isOpenDrawer: boolean
}

export default function AsideHeaderClient({ drawerWidth, isOpenDrawer }: AsideHeaderClientProps) {
	const { isLoading } = useContext(AppGlobalContext)
	const [mobileOpen, setMobileOpen] = useState(false)
	const [isClosing, setIsClosing] = useState(false)
	const [open, setOpen] = useState(isOpenDrawer)

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

	const handleDrawerOpen = () => {
		setOpen(!open)
		if (window) {
			document.cookie = `drawerOpen=${!open}; path=/`
		}
	}

	const logOut = () => {
		signOut()
	}

	return (
		<>
			<AppLoader isLoading={isLoading} />
			<Header
				drawerWidth={drawerWidth}
				handleDrawerToggle={handleDrawerToggle}
				open={open}
				handleDrawerOpen={handleDrawerOpen}
				logOut={logOut}
			/>
			<Aside
				drawerWidth={drawerWidth}
				mobileOpen={mobileOpen}
				handleDrawerClose={handleDrawerClose}
				handleDrawerTransitionEnd={handleDrawerTransitionEnd}
				open={open}
			/>
		</>
	)
}
