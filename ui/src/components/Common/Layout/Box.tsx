import { Box, BoxProps } from '@mui/material'
import { ForwardedRef, forwardRef } from 'react'

const AppBox = forwardRef<
	HTMLDivElement,
	BoxProps & {
		component?: React.ElementType
	}
>(
	(
		{ children, component = 'div', ...rest },
		ref: ForwardedRef<HTMLDivElement>
	) => {
		return (
			<Box ref={ref} component={component} {...rest}>
				{children}
			</Box>
		)
	}
)

AppBox.displayName = 'AppBox'
export default AppBox
