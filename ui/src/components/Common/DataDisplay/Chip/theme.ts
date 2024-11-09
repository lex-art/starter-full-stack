import { font } from '@/lib/designTokens'
import { ThemeOptions } from '@mui/material'

const AppChipTheme: ThemeOptions = {
	components: {
		MuiChip: {
			styleOverrides: {
				root: {
					lineHeight: font.sizes.fontSizeMedium,
					fontSize: font.sizes.fontSizeMedium
				}
			},
			variants: [
				{
					props: { variant: 'filled' },
					style: {
						fontSize: font.sizes.fontSizeMedium
					}
				}
			]
		}
	}
}
export { AppChipTheme }
