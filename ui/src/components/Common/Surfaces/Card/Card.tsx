import { Card, CardProps, ThemeOptions } from '@mui/material'
import { FC, forwardRef } from 'react'

const AppCard = forwardRef<HTMLDivElement, CardProps>(({ children, ...rest }, ref) => {
	return (
		<Card ref={ref} {...rest}>
			{children}
		</Card>
	)
})

AppCard.displayName = 'AppCard'
export default AppCard
