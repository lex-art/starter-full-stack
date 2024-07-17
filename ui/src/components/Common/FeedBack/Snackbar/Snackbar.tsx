import { font } from '@/lib/design-tokens'
import { AlertColor, AlertPropsColorOverrides, Snackbar, SnackbarProps, ThemeOptions } from '@mui/material'
import React, { forwardRef, SyntheticEvent } from 'react'
import AppAlert from '../Alert/Alert'

const AppThemeOptions: ThemeOptions = {
	components: {
		MuiSnackbar: {
			defaultProps: {
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right'
				},
				autoHideDuration: 6000,
				color: 'success'
			},
			styleOverrides: {
				root: {
					'& .MuiSnackbarContent-root': {
						fontSize: font.sizes.fontSizeMedium
					}
				}
			}
		}
	}
}

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
export { AppThemeOptions }
export default AppSnackbar
