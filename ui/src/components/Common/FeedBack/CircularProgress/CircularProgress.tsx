import { CircularProgress, CircularProgressProps } from '@mui/material'
import { FC } from 'react'

const AppCircularProgress: FC<CircularProgressProps> = (props) => {
	return <CircularProgress {...props} />
}

AppCircularProgress.displayName = 'AppCircularProgress'
export default AppCircularProgress
