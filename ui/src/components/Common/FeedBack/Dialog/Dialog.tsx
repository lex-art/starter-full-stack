import { colors, font } from '@/lib/designTokens'
import {
	AlertColor,
	DialogTitle,
	useMediaQuery,
	useTheme
} from '@mui/material'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { ReactNode } from 'react'
import AppTypography from '../../DataDisplay/Typography/Typography'
import AppIcons from '../../Icons/Icons'
import AppIconButton from '../../Inputs/IconButton/IconButton'
import AppAlert from '../Alert/Alert'

interface AppDialogProps {
	headerTitleSeverity?: AlertColor
	actionButtons?: ReactNode
	children: ReactNode
	minWidth?: string
	showCloseButton?: boolean
}

const AppDialog = ({
	open,
	onClose,
	title,
	children,
	actionButtons,
	headerTitleSeverity,
	minWidth,
	fullScreen,
	showCloseButton,
	...rest
}: DialogProps & AppDialogProps) => {
	const theme = useTheme()
	const responsive = useMediaQuery(theme.breakpoints.down('md'))
	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullScreen={fullScreen ?? responsive}
			transitionDuration={{
				enter: 500,
				exit: 500
			}}
			{...rest}
		>
			{headerTitleSeverity ? (
				<AppAlert severity={headerTitleSeverity}>
					<DialogTitle
						sx={{
							padding: '1rem 0'
						}}
						component="div"
					>
						<AppTypography variant="h4" fontWeight="bold">
							{title}
						</AppTypography>
					</DialogTitle>
					{showCloseButton && onClose && (
						<AppIconButton
							aria-label="close"
							onClick={(event) => onClose(event, 'backdropClick')}
							sx={{
								position: 'absolute',
								right: '8px',
								top: '8px',
								color: colors.light.textSecondary
							}}
						>
							<AppIcons.Close />
						</AppIconButton>
					)}
				</AppAlert>
			) : (
				<>
					<DialogTitle
						style={{
							fontSize: font.sizes.fontSizeLarge
						}}
						component="div"
					>
						<AppTypography variant="h4" fontWeight="bold">
							{title}
						</AppTypography>
					</DialogTitle>
					{showCloseButton && onClose && (
						<AppIconButton
							aria-label="close"
							onClick={(event) => onClose(event, 'backdropClick')}
							sx={{
								position: 'absolute',
								right: '8px',
								top: '8px',
								color: colors.light.textSecondary
							}}
						>
							<AppIcons.Close />
						</AppIconButton>
					)}
				</>
			)}
			<DialogContent
				style={{
					fontSize: font.sizes.fontSizeMedium,
					minWidth: minWidth ?? '600px'
				}}
			>
				{children}
			</DialogContent>
			{actionButtons && (
				<DialogActions sx={{ padding: '1.6rem' }}>
					{actionButtons}
				</DialogActions>
			)}
		</Dialog>
	)
}

AppDialog.displayName = 'AppDialog'
export default AppDialog
