import { ThemeOptions } from '@mui/material'

const AppCardTheme: ThemeOptions = {
	components: {
		MuiCard: {
			defaultProps: {
				elevation: 10,
				variant: 'outlined'
			},
			styleOverrides: {
				root: {
					borderRadius: '1rem'
				}
			}
		}
	}
}

export { AppCardTheme }