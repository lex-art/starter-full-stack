'use client'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ReactNode, createContext, useMemo, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { paletteThemeOptions } from './theme'
import { CssBaseline, PaletteMode, createTheme } from '@mui/material'
import { AppButtonThemeOptions } from '../Common/Button/Button'
import { AppTypographyTheme } from '../Common/Typography/Typography'
import { AppAutocompleteTheme } from '../Common/Autocomplete/Autocomplete'
import { AppTextFieldThemeOptions } from '../Common/TextField/TextField'

interface AppThemeProps {
	children: ReactNode
	window?: () => Window
}

const ColorModeContext = createContext({ toggleColorMode: () => {} })

const AppThemeMUI = ({ children, window }: AppThemeProps) => {
	const storageMode = (
		window !== undefined ? () => window().localStorage.getItem('colorMode') : 'light'
	) as PaletteMode
	const [mode, setMode] = useState<PaletteMode>(storageMode)
	const colorMode = useMemo(
		() => ({
			// The dark mode switch would invoke this method
			toggleColorMode: () => {
				setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'))
			}
		}),
		[]
	)
	const theme = useMemo(
		() =>
			createTheme(
				paletteThemeOptions(mode),
				AppButtonThemeOptions,
				AppTypographyTheme,
				AppAutocompleteTheme,
				AppTextFieldThemeOptions
			),
		[mode]
	)

	return (
		<ColorModeContext.Provider value={colorMode}>
			<AppRouterCacheProvider /*options={{ enableCssLayer: true }} */>
				<ThemeProvider theme={theme}>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					{children}
				</ThemeProvider>
			</AppRouterCacheProvider>
		</ColorModeContext.Provider>
	)
}

export { AppThemeMUI, ColorModeContext }
