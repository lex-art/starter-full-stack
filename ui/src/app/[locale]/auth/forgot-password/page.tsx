'use client'
import { forgotPassword } from '@/actions/auth/forgot-password.action'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppCircularProgress from '@/components/Common/FeedBack/CircularProgress/CircularProgress'
import AppButton from '@/components/Common/Inputs/Button/Button'
import AppTextField from '@/components/Common/Inputs/TextField/TextField'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import AppPaper from '@/components/Common/Layout/Paper'
import { Link } from '@/i18n/routing'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import logo from '../../../../../public/img/react.png'
import { userSchema } from '../../../schemas/users/user'
type UserSchema = z.infer<typeof userSchema>

const ErrorMessages = {
	ERROR_SENDING_EMAIL: 'ERROR_SENDING_EMAIL',
	USER_NOT_FOUND: 'USER_NOT_FOUND'
}
export default function ForgotPassword() {
	const { enqueueSnackbar } = useSnackbar()
	const [isLoading, transaction] = useTransition()
	const { control, handleSubmit, formState } =
		useForm<UserSchema>({
			mode: 'onSubmit',
			resolver: zodResolver(
				userSchema.pick({ email: true })
			),
			defaultValues: {
				email: ''
			}
		})
	const onSubmit = async (data: UserSchema) => {
		transaction(async () => {
			const username = data.email
			const res: {
				message: string
				error?: { code: string }
				data?: Record<string, unknown>
			} = await forgotPassword<{
				message: string
				error?: { code: string }
				data?: Record<string, unknown>
			}>(username)
			if (res.message === 'Email sent') {
				enqueueSnackbar('Correo enviado', {
					variant: 'success'
				})
				redirect('/auth/login')
			}
			enqueueSnackbar(
				'Ocurrió un error intente más tarde',
				{
					variant: 'error'
				}
			)
			return
		})
	}

	return (
		<AppGrid
			container
			display="grid"
			justifyContent="center"
			alignItems="center"
			height="100dvh"
			sx={{
				backgroundColor: (theme) =>
					theme.palette.primary.main
			}}
		>
			<AppPaper
				elevation={5}
				sx={{
					padding: 2,
					minWidth: {
						sx: 300,
						md: 300
					},
					maxWidth: 500,
					width: 500,
					minHeight: 500,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',

					gap: 2
				}}
			>
				<AppTypography variant="h4">
					Recupera cuenta
				</AppTypography>
				<Image
					src={logo}
					alt="Logo"
					width={100}
					height={100}
					priority
				/>
				<AppTypography variant="body1" fontWeight="bold">
					Simple Form
				</AppTypography>
				<form
					style={{
						margin: 0,
						padding: 0,
						boxSizing: 'border-box',
						width: '100%'
					}}
					onSubmit={handleSubmit(onSubmit)}
				>
					<Controller
						control={control}
						name="email"
						render={({ field, fieldState: { error } }) => (
							<AppTextField
								fullWidth
								{...field}
								error={!!error}
								helperText={error?.message}
								label="Email"
							/>
						)}
					/>

					<AppButton
						type="submit"
						fullWidth
						variant="contained"
						sx={{
							mt: 1
						}}
						disabled={isLoading || !formState.isValid}
						endIcon={
							isLoading ? (
								<AppCircularProgress
									size={25}
									color="secondary"
								/>
							) : null
						}
					>
						Recuperar
					</AppButton>
				</form>
				<Link
					style={{
						textDecoration: 'none'
					}}
					href="/auth/login"
				>
					<AppTypography
						variant="body2"
						color="textSecondary"
					>
						Regresar
					</AppTypography>
				</Link>
			</AppPaper>
		</AppGrid>
	)
}
