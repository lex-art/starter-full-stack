import { ThemeOptions } from '@mui/material'

const AppListItemIconTheme: ThemeOptions = {
	components: {
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					minWidth: 'auto'
				}
			}
		}
	}
}

export { AppListItemIconTheme }
