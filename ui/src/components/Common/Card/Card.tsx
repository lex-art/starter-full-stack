import { Card, CardProps, ThemeOptions } from '@mui/material'
import { FC } from 'react'

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

const AppCard: FC<CardProps> = ({ children, ...rest }) => {
	return <Card {...rest}>{children}</Card>
}

AppCard.displayName = 'AppCard'

export { AppCard, AppCardTheme }
export default AppCard
