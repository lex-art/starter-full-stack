
import Typography, { TypographyProps } from '@mui/material/Typography'
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react'

const AppTypography: ForwardRefExoticComponent<Omit<TypographyProps, 'ref'> & RefAttributes<HTMLSpanElement>> = forwardRef<HTMLSpanElement, TypographyProps>(
	({ children, ...rest }, ref) => {
		return (
			<Typography ref={ref} {...rest}>
				{children}
			</Typography>
		)
	}
)

AppTypography.displayName = 'AppTypography'
export default AppTypography
