import { Box, BoxProps } from '@mui/material'
import { ForwardedRef, forwardRef } from 'react'

const AppBox = forwardRef<HTMLDivElement, BoxProps>(
	({ children, ...rest }, ref: ForwardedRef<HTMLDivElement>) => {
		return (
			<Box ref={ref} {...rest}>
				{children}
			</Box>
		)
	}
)

AppBox.displayName = 'AppBox'
export default AppBox
