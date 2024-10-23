import { ThemeOptions } from '@mui/material'

export const AppInputAdornmentTheme: ThemeOptions = {
	components: {
		MuiInputAdornment: {
			styleOverrides: {
				root: {
					marginRight: '0'
				}
			}
		}
	}
}
