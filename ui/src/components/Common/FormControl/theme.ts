import { font } from '@/lib/designTokens'
import { FormControlProps, ThemeOptions } from '@mui/material'

interface AppFormControlProps extends FormControlProps {
	align?: 'start' | 'end'
}

interface AppFormGroupProps {
	gridAreaTemplateColumns?: string
	columnGap?: string
	rowGap?: string
}

// Themes for the FormControl component
const AppFormGroupThem: ThemeOptions = {
	components: {
		MuiFormGroup: {
			styleOverrides: {
				root: {
					display: 'grid',
					alignItems: 'center',
					//gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
					columnGap: '1rem',
					rowGap: '0.5rem'
				}
			}
		}
	}
}

const AppFormControlLabelTheme: ThemeOptions = {
	components: {
		MuiFormControlLabel: {
			styleOverrides: {
				label: {
					fontSize: font.sizes.fontSizeLarge - 3
				}
			}
		},
		MuiFormLabel: {
			styleOverrides: {
				root: {
					fontSize: font.sizes.fontSizeLarge - 3
				}
			}
		}
	}
}

const AppFormLabelTheme: ThemeOptions = {
	components: {
		MuiFormLabel: {
			styleOverrides: {
				root: {
					fontSize: font.sizes.fontSizeMedium
				}
			}
		}
	}
}

export { AppFormControlLabelTheme, AppFormGroupThem, AppFormLabelTheme }
export type { AppFormControlProps, AppFormGroupProps }
