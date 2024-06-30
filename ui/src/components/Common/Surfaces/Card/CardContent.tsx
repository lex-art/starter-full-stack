import { CardContent, CardContentProps } from '@mui/material'
import { FC, forwardRef } from 'react'

const AppCardContent: FC<CardContentProps> = forwardRef<HTMLDivElement, CardContentProps>(
	({ children, ...rest }, ref) => {
		return (
			<CardContent ref={ref} component="div" {...rest}>
				{children}
			</CardContent>
		)
	}
)

AppCardContent.displayName = 'AppCardContent'
export { AppCardContent }
export default AppCardContent
