import { font } from '@/lib/designTokens'
import { ThemeOptions } from '@mui/material'

const AppStaticDatePickerTheme: ThemeOptions = {
	components: {
		MuiDateCalendar: {
			styleOverrides: {
				root: {
					fontSize: font.sizes.fontSizeMedium
				}
			}
		}
	}
}

const AppDatePickerTheme: ThemeOptions = {
	components: {
		MuiDateCalendar: {
			styleOverrides: {
				root: {
					borderWidth: 0
				}
			}
		},
		MuiDayCalendar: {
			styleOverrides: {
				root: {
					borderRadius: '0.5rem'
				}
			}
		},
		MuiDatePicker: {
			defaultProps: {}
		}
	}
}

export { AppDatePickerTheme, AppStaticDatePickerTheme }
