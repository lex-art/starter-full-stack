import { font } from '@/lib/design-tokens'
import { TabProps, Tab, ThemeOptions } from '@mui/material'
import { FC, forwardRef } from 'react'

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

const AppTab: FC<TabProps> = forwardRef<HTMLDivElement, TabProps>((props, ref) => {
	return <Tab label {...props} ref={ref} />
})

AppTab.displayName = 'AppTab'
export { createAppTabTheme }
export default AppTab
