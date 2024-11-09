import { font } from '@/lib/designTokens'
import { Snackbar, SnackbarProps, ThemeOptions } from '@mui/material'
import { forwardRef } from 'react'
import AppAlert from '../Alert/Alert'


interface AppSnackbarProps extends SnackbarProps {
	severity?: 'success' | 'info' | 'warning' | 'error'
	variant?: 'filled' | 'outlined' | 'standard'
	//onClose?(event: SyntheticEvent): void
}

const AppSnackbar = forwardRef<HTMLDivElement, AppSnackbarProps>(
	({ message, onClose, severity, variant, ...rest }, ref) => {
		return (
			<Snackbar ref={ref} onClose={onClose} {...rest} sx={undefined}>
				<AppAlert onClose={onClose as any} severity={severity} variant={variant} sx={{ width: '100%' }}>
					{message}
				</AppAlert>
			</Snackbar>
		)
	}
)

AppSnackbar.displayName = 'AppSnackbar'
export default AppSnackbar
