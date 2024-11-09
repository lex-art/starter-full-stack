import Alert, { AlertProps } from '@mui/material/Alert'
import { forwardRef } from 'react'

const AppAlert = forwardRef<HTMLDivElement, AlertProps>(({ children, severity, sx, ...rest }, ref) => {
	return (
		<Alert ref={ref} {...rest}>
			{children}
		</Alert>
	)
})

AppAlert.displayName = 'AppAlert'
export default AppAlert
