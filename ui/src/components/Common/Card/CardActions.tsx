import {
	Card,
	CardActions,
	CardActionsProps,
	CardContent,
	CardContentProps,
	CardHeader,
	CardHeaderProps,
	CardMedia,
	CardMediaProps,
	CardProps,
	ThemeOptions
} from '@mui/material'
import { FC } from 'react'

const AppCardActions: FC<CardActionsProps> = ({ children, ...rest }) => {
	return <CardActions {...rest}>{children}</CardActions>
}

AppCardActions.displayName = 'AppCardActions'
export { AppCardActions }
export default AppCardActions
