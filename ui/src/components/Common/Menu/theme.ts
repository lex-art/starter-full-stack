import { font } from '@/lib/designTokens'
import { ThemeOptions } from '@mui/material'

const AppMuiItemTheme: ThemeOptions = {
	components: {
		MuiMenuItem: {
			styleOverrides: {
				root: {
					fontSize: font.sizes.fontSizeMedium,
					padding: '0.5rem 1rem',
					fontWeight: 400
					/* lineHeight: '3rem',
					 */
				}
			}
		}
	}
}

export { AppMuiItemTheme }
