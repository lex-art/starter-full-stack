// src/theme.ts
'use client'
import { colors, font } from '@/lib/design-tokens'
import { PaletteOptions, ThemeOptions, createTheme } from '@mui/material/styles'
import { Roboto } from 'next/font/google'

const robotoFont = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap'
})

const PaletteThemeOptions: ThemeOptions & PaletteOptions = {
	palette: {
		mode: 'light',
		primary: {
			main: colors.primary,
			light: colors.primaryLight,
			dark: colors.primaryDark,
			contrastText: colors.textSecondary
		},
		secondary: {
			main: colors.secondary,
			light: colors.secondaryLight,
			dark: colors.secondaryDark,
			contrastText: colors.textSecondary
		},
		success: {
			main: colors.success,
			light: colors.successLight,
			dark: colors.successDark,
			contrastText: colors.textSecondary
		},
		error: {
			main: colors.error,
			light: colors.errorLight,
			dark: colors.errorDark,
			contrastText: colors.textSecondary
		},
		warning: {
			main: colors.warning,
			light: colors.warningLight,
			dark: colors.warningDark,
			contrastText: colors.textSecondary
		}
	},
	text: {
		primary: colors.text,
		secondary: colors.textSecondary
	},
	typography: {
		fontFamily: robotoFont.style.fontFamily,
		fontSize: font.sizes.fontSizeMedium,
		h1: {
			fontFamily: font.fontFamilyBold
		},
		h2: {
			fontFamily: font.fontFamilyBold
		}
	}
}

const theme = createTheme(PaletteThemeOptions)

export { robotoFont, PaletteThemeOptions }
export default theme
