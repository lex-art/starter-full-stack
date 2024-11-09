import { font } from '@/lib/designTokens'
import { ThemeOptions } from '@mui/material'

const AppThemeOptions: ThemeOptions = {
	components: {
		MuiSnackbar: {
			defaultProps: {
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right'
				},
				autoHideDuration: 6000,
				color: 'success'
			},
			styleOverrides: {
				root: {
					'& .MuiSnackbarContent-root': {
						fontSize: font.sizes.fontSizeMedium
					}
				}
			}
		}
	}
}

export { AppThemeOptions }
