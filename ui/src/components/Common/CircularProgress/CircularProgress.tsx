import { CircularProgress, CircularProgressProps, ThemeOptions } from '@mui/material'
import { FC } from 'react'

const AppCircularProgressTheme: ThemeOptions = {
	components: {
		MuiCircularProgress: {
			defaultProps: {
				color: 'primary',
				size: 40
			}
		}
	}
}

const AppCircularProgress: FC<CircularProgressProps> = (props) => {
	return <CircularProgress {...props} />
}

AppCircularProgress.displayName = 'AppCircularProgress'
export { AppCircularProgress, AppCircularProgressTheme }
export default AppCircularProgress
