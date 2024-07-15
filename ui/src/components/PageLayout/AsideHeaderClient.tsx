'use client'
import React, { useState } from 'react'
import Header from './header/Header'
import Aside from './Aside/Aside'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { z } from 'zod'
import { makeZodI18nMap } from '@/lib/zod/zodErrorMap'

interface AsideHeaderClientProps {
	readonly drawerWidth: number
}

export default function AsideHeaderClient({ drawerWidth }: AsideHeaderClientProps) {
	// this configuration is for the zod error messages for global use in client sides
	const t = useTranslations('zod')
	z.setErrorMap(
		makeZodI18nMap({
			t
		})
	)
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

	const logOut = () => {
		signOut()
	}

	return (
		<>
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
