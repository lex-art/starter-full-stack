import { Box, BoxProps } from '@mui/material'
import { FC } from 'react'

const AppBox: FC<BoxProps> = ({ children, ...props }) => {
	return <Box {...props}>{children}</Box>
}

export default AppBox
