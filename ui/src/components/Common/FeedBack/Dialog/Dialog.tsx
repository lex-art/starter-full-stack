import { AlertColor, useMediaQuery } from '@mui/material'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { ReactNode } from 'react'
import AppAlert from '../Alert/Alert'
import { colors } from '@/lib/design-tokens'
import AppTypography from '../../DataDisplay/Typography/Typography'

interface AppDialogProps {
	titleText?: string
	headerTitleSeverity?: AlertColor
	actionButtons?: ReactNode
	children: ReactNode
	minWidth?: string
}

const AppDialog = ({
	open,
	onClose,
	titleText,
	children,
	actionButtons,
	headerTitleSeverity,
	minWidth,
	fullScreen,
	...rest
}: DialogProps & AppDialogProps) => {
	const isMobile: boolean = useMediaQuery('(min-width: 960px)')
	return (
		<Dialog open={open} onClose={onClose} fullScreen={fullScreen ?? !isMobile} {...rest}>
			{headerTitleSeverity ? (
				<AppAlert alertColor={headerTitleSeverity}>
					<AppTypography variant="h4" fontFamily="RobotoBold" color={colors.light.textSecondary}>
						{titleText}
					</AppTypography>
				</AppAlert>
			) : (
				<div
					style={{
						padding: '16px 24px 0px 24px',
						fontSize: '1.9rem'
					}}
				>
					<AppTypography variant="h4" fontFamily="RobotoBold" color={colors.light.textSecondary}>
						{titleText}
					</AppTypography>
				</div>
			)}
			<DialogContent style={{ fontSize: '1.6rem', minWidth: minWidth ?? '600px' }}>{children}</DialogContent>
			{actionButtons && <DialogActions sx={{ padding: '1.6rem' }}>{actionButtons}</DialogActions>}
		</Dialog>
	)
}

AppDialog.displayName = 'AppDialog'
export { AppDialog }
export default AppDialog
