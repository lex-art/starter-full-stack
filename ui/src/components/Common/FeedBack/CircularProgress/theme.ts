import { ThemeOptions } from '@mui/material'

export const AppCircularProgressTheme: ThemeOptions = {
	components: {
		MuiCircularProgress: {
			defaultProps: {
				color: 'primary',
				size: 40
			}
		}
	}
}
