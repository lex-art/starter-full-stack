import { font } from '@/lib/design-tokens'
import { ThemeOptions } from '@mui/material'
import Alert, { AlertProps } from '@mui/material/Alert'
import { forwardRef } from 'react'

const AppAlertTheme: ThemeOptions = {
	components: {
		MuiAlert: {
			defaultProps: {
				severity: 'success'
			},
			styleOverrides: {
				root: {
					fontSize: font.sizes.fontSizeMedium
				}
			}
		}
	}
}

export const AppAlert = forwardRef<HTMLDivElement, AlertProps>(({ children, severity, sx, ...rest }, ref) => {
	return (
		<Alert ref={ref} {...rest}>
			{children}
		</Alert>
	)
})

AppAlert.displayName = 'AppAlert'
export { AppAlertTheme }
export default AppAlert
