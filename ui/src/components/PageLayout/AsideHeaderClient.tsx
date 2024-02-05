'use client'
import React, { useState } from 'react'
import Header from './header/Header'
import Aside from './Aside/Aside'

interface AdiseHeaderClientProps {
	drawerWidth: number
}

export default function AsideHeaderClient({ drawerWidth }: AdiseHeaderClientProps) {
	const [mobileOpen, setMobileOpen] = useState(false)
	const [isClosing, setIsClosing] = useState(false)
	const [open, setOpen] = useState(true)

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
	}

	return (
		<>
			<Header
				drawerWidth={drawerWidth}
				handleDrawerToggle={handleDrawerToggle}
				open={open}
				handleDrawerOpen={handleDrawerOpen}
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
