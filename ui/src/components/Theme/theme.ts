// src/theme.ts
'use client'
import { colors, font } from '@/lib/designTokens'
import { PaletteMode } from '@mui/material'
import { PaletteOptions, ThemeOptions } from '@mui/material/styles'
import { Roboto } from 'next/font/google'

const robotoFont = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap'
})

const getDesignTokens = (mode: PaletteMode) => ({
	palette: {
		mode,
		...(mode === 'light'
			? {
					primary: {
						main: colors.light.primary,
						light: colors.light.primaryLight,
						dark: colors.light.primaryDark,
						contrastText: '#fff'
					},
					secondary: {
						main: colors.light.secondary,
						light: colors.light.secondaryLight,
						dark: colors.light.secondaryDark,
						contrastText: colors.light.white
					},
					success: {
						main: colors.light.success,
						light: colors.light.successLight,
						dark: colors.light.successDark,
						contrastText: colors.light.white
					},
					error: {
						main: colors.light.error,
						light: colors.light.errorLight,
						dark: colors.light.errorDark,
						contrastText: colors.light.white
					},
					warning: {
						main: colors.light.warning,
						light: colors.light.warningLight,
						dark: colors.light.warningDark,
						contrastText: colors.light.white
					},
					text: {
						primary: colors.light.textSecondary,
						secondary: colors.light.textSecondary
					}
				}
			: {
					primary: {
						main: colors.dark.primary,
						light: colors.dark.primaryLight,
						dark: colors.dark.primaryDark,
						contrastText: colors.dark.white
					},
					secondary: {
						main: colors.dark.secondary,
						light: colors.dark.secondaryLight,
						dark: colors.dark.secondaryDark,
						contrastText: colors.light.white
					},
					success: {
						main: colors.dark.success,
						light: colors.dark.successLight,
						dark: colors.dark.successDark,
						contrastText: colors.dark.white
					},
					error: {
						main: colors.dark.error,
						light: colors.dark.errorLight,
						dark: colors.dark.errorDark,
						contrastText: colors.dark.white
					},
					warning: {
						main: colors.dark.warning,
						light: colors.dark.warningLight,
						dark: colors.dark.warningDark,
						contrastText: colors.dark.white
					},
					background: {
						default: colors.dark.primaryDark,
						paper: colors.dark.primaryLight
					},
					text: {
						primary: colors.dark.white,
						secondary: colors.dark.white
					}
				})
	}
})

const paletteThemeOptions = (mode: PaletteMode): ThemeOptions & PaletteOptions => ({
	...getDesignTokens(mode),
	...(mode === 'light'
		? { background: { default: colors.light.primaryDark } }
		: { background: { default: colors.dark.primaryDark } }),
	transitions: {
		easing: {
			easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
			easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
			easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
			sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
		},
		duration: {
			shortest: 150,
			shorter: 200,
			short: 250,
			standard: 300,
			complex: 375,
			enteringScreen: 2225,
			leavingScreen: 1195
		}
	},
	typography: {
		fontFamily: robotoFont.style.fontFamily,
		fontSize: font.sizes.fontSizeMedium
	},
	shape: {
		borderRadius: 8
	}
})

export { paletteThemeOptions, robotoFont }
