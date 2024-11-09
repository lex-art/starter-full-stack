import { font } from '@/lib/designTokens'
import { ThemeOptions } from '@mui/material'

const AppRadioTheme: ThemeOptions = {
	components: {
		MuiRadio: {
			defaultProps: {
				color: 'primary'
			},
			styleOverrides: {
				root: {
					'& .MuiSvgIcon-root': {
						height: '2rem',
						width: '2rem',
						fontSize: font.sizes.fontSizeMedium
					}
				},
				sizeSmall: {
					'& .MuiSvgIcon-root': {
						height: '1.5rem',
						width: '1.5rem'
					}
				}
			}
		}
	}
}

export { AppRadioTheme }
