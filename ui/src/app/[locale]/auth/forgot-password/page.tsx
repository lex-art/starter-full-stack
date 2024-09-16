'use client'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppCircularProgress from '@/components/Common/FeedBack/CircularProgress/CircularProgress'
import AppButton from '@/components/Common/Inputs/Button/Button'
import AppTextField from '@/components/Common/Inputs/TextField/TextField'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import AppPaper from '@/components/Common/Layout/Paper'
import { Link } from '@/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useSnackbar } from 'notistack'
import { useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import logo from '../../../../../public/img/react.png'
import { userSchema } from '../login/schema/user'
type UserSchema = z.infer<typeof userSchema>

export default function ForgotPassword() {
	const { enqueueSnackbar } = useSnackbar()
	const [isLoading, transaction] = useTransition()
	const { control, handleSubmit } = useForm<UserSchema>({
		mode: 'onSubmit',
		resolver: zodResolver(userSchema),
		defaultValues: {
			email: ''
		}
	})
	const onSubmit = async (data: UserSchema) => {
		transaction(async () => {
			const username = data.email
		})
	}

	return (
		<AppGrid
			container
			display="grid"
			justifyContent="center"
			alignItems="center"
			height="100vh"
			sx={{
				backgroundColor: (theme) => theme.palette.primary.main
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
				<AppTypography variant="h4">Recupera cuenta</AppTypography>
				<Image src={logo} alt="Logo" width={100} height={100} priority />
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
							<AppTextField fullWidth {...field} error={!!error} helperText={error?.message} label="Email" />
						)}
					/>

					<AppButton
						type="submit"
						fullWidth
						variant="contained"
						sx={{
							mt: 1
						}}
						disabled={isLoading}
						endIcon={isLoading ? <AppCircularProgress size={25} color="secondary" /> : null}
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
					<AppTypography variant="body2" color="textSecondary">
						Regresar
					</AppTypography>
				</Link>
			</AppPaper>
		</AppGrid>
	)
}
