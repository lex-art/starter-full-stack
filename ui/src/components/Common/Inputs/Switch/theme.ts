import { font } from '@/lib/designTokens'
import { ThemeOptions } from '@mui/material'

const AppSwitchTheme: ThemeOptions = {
	components: {
		MuiSwitch: {
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
export { AppSwitchTheme }
