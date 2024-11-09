import { font } from '@/lib/designTokens'
import { ThemeOptions } from '@mui/material'

const AppCheckboxTheme: ThemeOptions = {
	components: {
		MuiCheckbox: {
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
				sizeMedium: {
					fontSize: '1rem'
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

export { AppCheckboxTheme }
