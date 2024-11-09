'use client'
import { SETTINGS_TOAST } from '@/configs'
import { makeZodI18nMap } from '@/lib/zod/zodErrorMap'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { CssBaseline, PaletteMode, createTheme } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useLocale, useTranslations } from 'next-intl'
import { SnackbarProvider } from 'notistack'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { z } from 'zod'
import { AppChipTheme } from '../Common/DataDisplay/Chip/theme'
import { AppDividerTheme } from '../Common/DataDisplay/Divider/theme'
import { AppTooltipTheme } from '../Common/DataDisplay/Tooltip/theme'
import { AppTypographyTheme } from '../Common/DataDisplay/Typography/theme'
import { AppAlertTheme } from '../Common/FeedBack/Alert/theme'
import { AppCircularProgressTheme } from '../Common/FeedBack/CircularProgress/theme'
import { AppThemeOptions } from '../Common/FeedBack/Snackbar/theme'
import {
	AppFormGroupThem,
	AppFormLabelTheme
} from '../Common/FormControl/theme'
import { AppIconsTheme } from '../Common/Icons/theme'
import { AppAutocompleteTheme } from '../Common/Inputs/Autocomplete/theme'

import { SWRConfig } from 'swr'
import { AppTableCellTheme } from '../Common/DataDisplay/Table/theme'
import { AppButtonTheme } from '../Common/Inputs/Button/theme'
import { AppCheckboxTheme } from '../Common/Inputs/CheckBox/theme'
import {
	AppDatePickerTheme,
	AppStaticDatePickerTheme
} from '../Common/Inputs/DatePicker/theme'
import { AppDropdownTheme } from '../Common/Inputs/Dropdown/theme'
import { AppInputAdornmentTheme } from '../Common/Inputs/NumericField/InputAdornmentTheme'
import { AppRadioTheme } from '../Common/Inputs/Radio/theme'
import { AppSliderTheme } from '../Common/Inputs/Slider/theme'
import { AppSwitchTheme } from '../Common/Inputs/Switch/theme'
import { AppTextFieldThemeOptions } from '../Common/Inputs/TextField/theme'
import { AppGridTheme } from '../Common/Layout/Grid/theme'
import { AppListItemIconTheme } from '../Common/Menu/ListMenu/theme'
import { AppMuiItemTheme } from '../Common/Menu/theme'
import { AppRatingTheme } from '../Common/Rating/theme'
import { AppDataTableTheme } from '../DataTable/theme'
import { AppStepLabelThem } from '../Stepper/theme'
import { AppTablePaginationTheme } from '../TablePagination/theme'
import { createAppTabTheme } from '../Tabs/theme'
import { paletteThemeOptions } from './theme'
import { AppGlobalContext } from './appTheme.context'

interface AppThemeProps {
	children: ReactNode
	initialThemeMode: PaletteMode
}

const createCacheEmotion = createCache({
	key: 'css',
	prepend: true
})

const AppThemeMUI = ({
	children,
	initialThemeMode = 'light'
}: AppThemeProps) => {
	const [mode, setMode] = useState<PaletteMode>(initialThemeMode)
	const [isLoading, setIsLoading] = useState(false)
	const locale = useLocale()
	const t = useTranslations('zod')
	const initValuesContext = useMemo(
		() => ({
			// The dark mode switch would invoke this method
			toggleColorMode: () => {
				setMode((prevMode: PaletteMode) => {
					const tempMode = prevMode === 'light' ? 'dark' : 'light'
					if (window) {
						document.cookie = `timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}; path=/`
						document.cookie = `theme=${tempMode}; path=/`
					}
					return tempMode
				})
			},
			isLoading,
			setIsLoading
		}),
		[isLoading]
	)
	// this configuration is for the zod error messages for global use in client sides
	z.setErrorMap(
		makeZodI18nMap({
			t
		})
	)

	useEffect(() => {
		if (initialThemeMode && initialThemeMode !== mode) {
			setMode(initialThemeMode)
		}
	}, [initialThemeMode])

	const theme = useMemo(
		() =>
			createTheme(
				paletteThemeOptions(mode),
				AppGridTheme,
				AppButtonTheme,
				AppTypographyTheme,
				AppAutocompleteTheme,
				AppTextFieldThemeOptions,
				AppDividerTheme,
				AppListItemIconTheme,
				AppIconsTheme,
				AppFormLabelTheme,
				AppChipTheme,
				AppDropdownTheme,
				AppCheckboxTheme,
				AppRadioTheme,
				AppSwitchTheme,
				AppRatingTheme,
				AppSliderTheme,
				AppStaticDatePickerTheme,
				AppDatePickerTheme,
				AppTooltipTheme,
				AppMuiItemTheme,
				AppDataTableTheme,
				AppTablePaginationTheme,
				createAppTabTheme(mode),
				AppFormGroupThem,
				AppStepLabelThem,
				AppThemeOptions,
				AppAlertTheme,
				AppInputAdornmentTheme,
				AppCircularProgressTheme,
				AppTableCellTheme
			),
		[mode]
	)

	return (
		<AppGlobalContext.Provider value={initValuesContext}>
			<CacheProvider value={createCacheEmotion}>
				<AppRouterCacheProvider /* options={{ enableCssLayer: true }} */>
					<ThemeProvider theme={theme}>
						{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
						<CssBaseline />
						<SnackbarProvider
							maxSnack={3}
							variant="success"
							anchorOrigin={SETTINGS_TOAST.anchorOrigin}
							style={SETTINGS_TOAST.style}
							autoHideDuration={3000}
							preventDuplicate
						>
							<LocalizationProvider
								dateAdapter={AdapterDayjs}
								adapterLocale={locale}
							>
								<SWRConfig value={{ provider: () => new Map() }}>
									{children}
								</SWRConfig>
							</LocalizationProvider>
						</SnackbarProvider>
					</ThemeProvider>
				</AppRouterCacheProvider>
			</CacheProvider>
		</AppGlobalContext.Provider>
	)
}

export default AppThemeMUI
