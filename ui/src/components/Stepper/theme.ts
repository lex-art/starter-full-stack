import { ThemeOptions } from '@mui/material'
import { font } from '@/lib/designTokens'

const AppStepLabelThem: ThemeOptions = {
	components: {
		MuiStepLabel: {
			styleOverrides: {
				label: {
					fontSize: font.sizes.fontSizeMedium
				}
			}
		}
	}
}

export { AppStepLabelThem }