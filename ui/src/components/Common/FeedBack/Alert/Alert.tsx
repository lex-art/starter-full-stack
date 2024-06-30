import Alert, { AlertColor } from '@mui/material/Alert'
import { FC, PropsWithChildren, ReactNode, forwardRef } from 'react'

interface AppAlertProps {
	alertColor?: AlertColor
	children: ReactNode
}

export const AppAlert: FC<AppAlertProps> = forwardRef<HTMLDivElement, AppAlertProps>(
	({ children, alertColor }, ref) => {
		return (
			<Alert
				ref={ref}
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
)

AppAlert.displayName = 'AppAlert'
export default AppAlert
