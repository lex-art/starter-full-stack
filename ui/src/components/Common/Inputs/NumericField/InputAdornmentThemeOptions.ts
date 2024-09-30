import { ThemeOptions } from '@mui/material'

export const InputAdornmentThemeOptions: ThemeOptions = {
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
