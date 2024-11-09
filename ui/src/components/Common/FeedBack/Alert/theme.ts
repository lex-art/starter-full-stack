import { font } from '@/lib/designTokens'
import { ThemeOptions } from '@mui/material'

const AppAlertTheme: ThemeOptions = {
	components: {
		MuiAlert: {
			defaultProps: {
				severity: 'success'
			},
			styleOverrides: {
				root: {
					fontSize: font.sizes.fontSizeMedium
				}
			}
		}
	}
}
export { AppAlertTheme }
