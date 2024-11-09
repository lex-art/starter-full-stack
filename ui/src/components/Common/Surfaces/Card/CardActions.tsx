import { CardActions, CardActionsProps } from '@mui/material'
import { forwardRef } from 'react'

const AppCardActions = forwardRef<HTMLElement, CardActionsProps>(({ children, ...rest }, ref) => {
	return (
		<CardActions ref={ref} {...rest}>
			{children}
		</CardActions>
	)
})

AppCardActions.displayName = 'AppCardActions'
export default AppCardActions
