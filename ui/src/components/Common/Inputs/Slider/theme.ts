import { font } from '@/lib/designTokens'
import { ThemeOptions } from '@mui/material'

const AppSliderTheme: ThemeOptions = {
	components: {
		MuiSlider: {
			defaultProps: {
				color: 'primary'
			},
			styleOverrides: {
				root: {
					fontSize: font.sizes.fontSizeLarge
				}
			}
		}
	}
}

export { AppSliderTheme }
