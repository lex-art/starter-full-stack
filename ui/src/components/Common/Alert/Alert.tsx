import Alert, { AlertColor } from '@mui/material/Alert'
import { PropsWithChildren, ReactNode } from 'react'

interface TBAlertProps {
	alertColor?: AlertColor
	children: ReactNode
}

export const AppAlert = ({ children, alertColor }: PropsWithChildren<TBAlertProps>) => {
	return (
		<Alert
			sx={{
				'& .MuiSvgIcon-root': {
					height: '3rem',
					alignSelf: 'center'
				}
			}}
			severity={alertColor}
		>
			{children}
		</Alert>
	)
}

AppAlert.displayName = 'AppAlert'
export default AppAlert
