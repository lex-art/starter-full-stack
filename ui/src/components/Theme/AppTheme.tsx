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
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react'
import { z } from 'zod'
import { AppChipTheme } from '../Common/DataDisplay/Chip/Chip'
import { AppDividerTheme } from '../Common/DataDisplay/Divider/Divider'
import { AppTooltipTheme } from '../Common/DataDisplay/Tooltip/Tooltip'
import { AppTypographyTheme } from '../Common/DataDisplay/Typography/theme'
import { AppAlertTheme } from '../Common/FeedBack/Alert/Alert'
import { AppCircularProgressTheme } from '../Common/FeedBack/CircularProgress/theme'
import { AppThemeOptions } from '../Common/FeedBack/Snackbar/Snackbar'
import {
	AppFormGroupThem,
	AppFormLabelTheme
} from '../Common/FormControl/theme'
import { AppIconsTheme } from '../Common/Icons/Icons'
import { AppAutocompleteTheme } from '../Common/Inputs/Autocomplete/Autocomplete'

import { AppButtonTheme } from '../Common/Inputs/Button/theme'
import { AppCheckboxTheme } from '../Common/Inputs/CheckBox/AppCheckBox'
import { AppDatePickerTheme } from '../Common/Inputs/DatePicker/DatePicker'
import { AppStaticDatePickerTheme } from '../Common/Inputs/DatePicker/StaticDatePicker'
import { AppDropdownTheme } from '../Common/Inputs/Dropdown/theme'
import { AppInputAdornmentTheme } from '../Common/Inputs/NumericField/InputAdornmentTheme'
import { AppRadioTheme } from '../Common/Inputs/Radio/Radio'
import { AppSliderTheme } from '../Common/Inputs/Slider/Slider'
import { AppSwitchTheme } from '../Common/Inputs/Switch/Switch'
import { AppTextFieldThemeOptions } from '../Common/Inputs/TextField/theme'
import { AppGridTheme } from '../Common/Layout/Grid/theme'
import { AppListItemIconTheme } from '../Common/Menu/ListMenu/ListItemIcon'
import { AppMuiItemTheme } from '../Common/Menu/theme'
import { AppRatingTheme } from '../Common/Rating/Rating'
import { AppDataTableTheme } from '../DataTable/theme'
import { AppStepLabelThem } from '../Stepper/StepLabel'
import { AppTablePaginationTheme } from '../TablePagination/TablePagination'
import { createAppTabTheme } from '../Tabs/Tab'
import { paletteThemeOptions } from './theme'
import { SWRConfig } from 'swr'

interface AppThemeProps {
	children: ReactNode
	initialThemeMode: PaletteMode
}

const AppGlobalContext = createContext({
	toggleColorMode: () => {},
	isLoading: false,
	setIsLoading: (value: boolean) => {}
})

const useAppTheme = () => useContext(AppGlobalContext)
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
				AppCircularProgressTheme
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

export { AppGlobalContext, AppThemeMUI, useAppTheme }
