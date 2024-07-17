'use client'
import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppSnackbar from '@/components/Common/FeedBack/Snackbar/Snackbar'
import AppIcons from '@/components/Common/Icons/Icons'
import AppButton from '@/components/Common/Inputs/Button/Button'
import AppIconButton from '@/components/Common/Inputs/IconButton/IconButton'
import AppBox from '@/components/Common/Layout/Box'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import AppPaper from '@/components/Common/Layout/Paper'
import { Severity } from '@/types'
import { SnackbarKey, useSnackbar } from 'notistack'
import React from 'react'

export default function SnackbarExample() {
	const [open, setOpen] = React.useState(false)
	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	const action = (
		<AppButton variant="text" size="small" color="inherit" onClick={() => setOpen(false)}>
			UNDO
		</AppButton>
	)

	const actions = (
		<>
			<AppButton variant="text" size="small" color="inherit" onClick={() => setOpen(false)}>
				UNDO
			</AppButton>
			<AppIconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={() => {
					closeSnackbar('error')
				}}
			>
				<AppIcons.Close fontSize="small" />
			</AppIconButton>
		</>
	)
	return (
		<AppGrid item width="100%">
			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography variant="subtitle2">Menus</AppTypography>
			</AppDivider>
			<AppGrid container display="grid">
				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTypography variant="body1" fontWeight="bold">
						Snackbar
					</AppTypography>
					<AppBox display="grid" gap={2} gridTemplateColumns="repeat(auto-fit, minmax(20rem, 1fr))">
						<AppButton
							variant="outlined"
							onClick={() => {
								setOpen(true)
							}}
						>
							Manual Snackbar whit action
						</AppButton>
						<AppSnackbar
							open={open}
							message="Test snackbar"
							severity="success"
							variant="filled"
							action={action}
						/>
						<AppButton
							onClick={() => {
								enqueueSnackbar('I love snacks.', {
									variant: Severity.Success,
									action
								})
							}}
						>
							enqueueSnackbar Error whit action
						</AppButton>
						<AppButton
							color="error"
							onClick={() => {
								enqueueSnackbar('I love snacks error.', {
									variant: Severity.Error,
									action: actions,
									key: 'error'
								})
							}}
						>
							enqueueSnackbar error
						</AppButton>

						<AppButton
							color="info"
							onClick={() => {
								enqueueSnackbar('I love snacks info.', {
									variant: Severity.Info,
									action: (key: SnackbarKey) => (
										<AppIconButton
											size="small"
											aria-label="close"
											color="inherit"
											onClick={() => {
												closeSnackbar(key)
											}}
										>
											<AppIcons.Close fontSize="small" />
										</AppIconButton>
									),
									key: 'info'
								})
							}}
						>
							enqueueSnackbar info
						</AppButton>
						<AppButton
							color="warning"
							onClick={() => {
								enqueueSnackbar('I love snacks warning.', {
									variant: Severity.Warning,
									action: (key: SnackbarKey) => (
										<AppIconButton
											size="small"
											aria-label="close"
											color="inherit"
											onClick={() => {
												closeSnackbar(key)
											}}
										>
											<AppIcons.Close fontSize="small" />
										</AppIconButton>
									),
									key: 'warning'
								})
							}}
						>
							enqueueSnackbar warning
						</AppButton>
						<AppButton
							color="inherit"
							onClick={() => {
								enqueueSnackbar('I love snacks Default.', {
									variant: Severity.Default,
									action: (key: SnackbarKey) => (
										<AppIconButton
											size="small"
											aria-label="close"
											color="inherit"
											onClick={() => {
												closeSnackbar(key)
											}}
										>
											<AppIcons.Close fontSize="small" />
										</AppIconButton>
									),
									key: 'Default'
								})
							}}
						>
							enqueueSnackbar Default
						</AppButton>
					</AppBox>
				</AppPaper>
			</AppGrid>
		</AppGrid>
	)
}
