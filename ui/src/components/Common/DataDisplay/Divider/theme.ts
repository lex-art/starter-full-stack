import { ThemeOptions } from '@mui/material'

const AppDividerTheme: ThemeOptions = {
	components: {
		MuiDivider: {
			styleOverrides: {
				root: {
					/* '&::before': {
						width: '3%'
					} */
				}
			}
		}
	}
}

export { AppDividerTheme }
