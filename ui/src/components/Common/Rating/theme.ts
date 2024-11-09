import { font } from '@/lib/designTokens'
import { ThemeOptions } from '@mui/material'

const AppRatingTheme: ThemeOptions = {
	components: {
		MuiRating: {
			defaultProps: {
				color: 'primary'
			},
			styleOverrides: {
				root: {
					fontSize: font.sizes.fontSizeLarge + 5
				},
				sizeLarge: {
					fontSize: font.sizes.fontSizeLarge + 10
				},
				sizeSmall: {
					fontSize: font.sizes.fontSizeMedium
				}
			}
		}
	}
}
export { AppRatingTheme }
