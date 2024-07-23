'use client'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ReactNode, createContext, useEffect, useMemo, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { paletteThemeOptions } from './theme'
import { CssBaseline, PaletteMode, createTheme } from '@mui/material'
import { AppButtonThemeOptions } from '../Common/Inputs/Button/Button'
import { AppTypographyTheme } from '../Common/DataDisplay/Typography/Typography'
import { AppTextFieldThemeOptions } from '../Common/Inputs/TextField/TextField'
import { AppDividerTheme } from '../Common/DataDisplay/Divider/Divider'
import { AppListItemIconTheme } from '../Common/Menu/ListMenu/ListItemIcon'
import { AppIconsTheme } from '../Common/Icons/Icons'
import { AppFormLabelTheme } from '../Common/FormControl/FormLabel'
import { AppChipTheme } from '../Common/DataDisplay/Chip/Chip'
import { AppCheckboxTheme } from '../Common/Inputs/CheckBox/AppCheckBox'
import { AppRatingTheme } from '../Common/Rating/Rating'
import { AppSliderTheme } from '../Common/Inputs/Slider/Slider'
import { AppStaticDatePickerTheme } from '../Common/Inputs/DatePicker/StaticDatePicker'
import { AppDatePickerTheme } from '../Common/Inputs/DatePicker/DatePicker'
import { AppTooltipTheme } from '../Common/DataDisplay/Tooltip/Tooltip'
import { AppAutocompleteTheme } from '../Common/Inputs/Autocomplete/Autocomplete'
import { AppDropdownTheme } from '../Common/Inputs/Dropdown/Dropdown'
import { AppRadioTheme } from '../Common/Inputs/Radio/Radio'
import { AppSwitchTheme } from '../Common/Inputs/Switch/Switch'
import { AppMuiItemTheme } from '../Common/Menu/MenuItem'
import { AppDataTableTheme } from '../DataTable/DataTable'
import { AppTablePaginationTheme } from '../TablePagination/TablePagination'
import { createAppTabTheme } from '../Tabs/Tab'
import { AppFormGroupThem } from '../Common/FormControl/FormGroup'
import { AppStepLabelThem } from '../Stepper/StepLabel'
import { AppThemeOptions } from '../Common/FeedBack/Snackbar/Snackbar'
import { AppAlertTheme } from '../Common/FeedBack/Alert/Alert'
import { SnackbarProvider } from 'notistack'
import { SETTINGS_TOAST } from '@/configs'
import { useLocale, useTranslations } from 'next-intl'
import { makeZodI18nMap } from '@/lib/zod/zodErrorMap'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { z } from 'zod'

interface AppThemeProps {
	children: ReactNode
	initialThemeMode: PaletteMode
}

const AppGlobalContext = createContext({
	toggleColorMode: () => {},
	isLoading: false,
	setIsLoading: (value: boolean) => {}
})

const AppThemeMUI = ({ children, initialThemeMode = 'light' }: AppThemeProps) => {
	const [mode, setMode] = useState<PaletteMode>(initialThemeMode)
	const [isLoading, setIsLoading] = useState(false)
	// this configuration is for the zod error messages for global use in client sides
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
				AppButtonThemeOptions,
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
				AppAlertTheme
			),
		[mode]
	)

	return (
		<AppGlobalContext.Provider value={initValuesContext}>
			<AppRouterCacheProvider /* options={{ enableCssLayer: true }} */>
				<ThemeProvider theme={theme}>
					<SnackbarProvider
						maxSnack={3}
						variant="success"
						anchorOrigin={SETTINGS_TOAST.anchorOrigin}
						style={SETTINGS_TOAST.style}
						autoHideDuration={3000}
						preventDuplicate
					>
						<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
							{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
							<CssBaseline />
							{children}
						</LocalizationProvider>
					</SnackbarProvider>
				</ThemeProvider>
			</AppRouterCacheProvider>
		</AppGlobalContext.Provider>
	)
}

export { AppThemeMUI, AppGlobalContext }
