import { font } from '@/lib/designTokens'
import { ThemeOptions } from '@mui/material'
import exp from 'constants'

const AppTooltipTheme: ThemeOptions = {
	components: {
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					fontSize: font.sizes.fontSizeMedium
				}
			},
			variants: [
				{
					props: { variant: 'light' },
					style: {
						'&.MuiTooltip-tooltip': {
							backgroundColor: 'blue',
							color: 'rgba(0, 0, 0, 0.87)',
							fontSize: font.sizes.fontSizeMedium,
							'&.MuiTooltip-arrow': {
								backgroundColor: 'red'
							}
						}
					}
				}
			]
		}
	}
}

export { AppTooltipTheme }
