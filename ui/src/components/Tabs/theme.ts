import { font } from '@/lib/designTokens'
import { ThemeOptions } from '@mui/material'
// Define una función para crear el tema de AppTab
const createAppTabTheme = (mode: string): ThemeOptions => ({
	components: {
		MuiTab: {
			styleOverrides: {
				root: {
					fontSize: font.sizes.fontSizeMedium,
					'&.Mui-selected': {
						color: mode === 'dark' ? 'white' : 'green'
					}
				}
			}
		}
	}
})

export { createAppTabTheme }
