import { Card, CardProps, ThemeOptions } from '@mui/material'
import { FC, forwardRef } from 'react'

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

const AppCard: FC<CardProps> = forwardRef<HTMLDivElement, CardProps>(({ children, ...rest }, ref) => {
	return (
		<Card ref={ref} {...rest}>
			{children}
		</Card>
	)
})

AppCard.displayName = 'AppCard'
export { AppCard, AppCardTheme }
export default AppCard
