'use client'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import { signIn } from 'next-auth/react'
import React, { useState, useTransition } from 'react'
import Image from 'next/image'
import logo from '../../../../../public/img/react.png'
import AppPaper from '@/components/Common/Layout/Paper'
import AppTextField from '@/components/Common/Inputs/TextField/TextField'
import AppButton from '@/components/Common/Inputs/Button/Button'
import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppIcons from '@/components/Common/Icons/Icons'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { userSchema } from './schema/user'
import { useSnackbar } from 'notistack'
import { Severity } from '@/types'
import AppCircularProgress from '@/components/Common/FeedBack/CircularProgress/CircularProgress'

type UserSchema = z.infer<typeof userSchema>

export default function Login() {
	const { enqueueSnackbar } = useSnackbar()
	const [isLoading, transaction] = useTransition()
	const { control, handleSubmit } = useForm<UserSchema>({
		mode: 'onSubmit',
		resolver: zodResolver(userSchema)
	})
	const onSubmit = async (data: UserSchema) => {
		transaction(async () => {
			const username = data.email
			const password = data.password
			const result = await signIn('credentials', {
				redirect: true, // Evita redirecciones automáticas
				username,
				password,
				callbackUrl: '/'
			})
			if (result?.error) {
				// Manejar errores, por ejemplo mostrando un mensaje al usuario
				console.error(result.error)
				enqueueSnackbar(result.error, {
					variant: Severity.Error
				})
			}
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
				<AppTypography variant="h4">Iniciar sesión</AppTypography>
				<Image src={logo} alt="Logo" width={100} height={100} />
				<AppTypography variant="body1" fontWeight="bold">
					Simple Form
				</AppTypography>
				<form
					style={{
						margin: 0,
						padding: 0,
						boxSizing: 'border-box'
					}}
					onSubmit={handleSubmit(onSubmit)}
				>
					<Controller
						control={control}
						name="email"
						render={({ field, fieldState: { error } }) => (
							<AppTextField {...field} error={!!error} helperText={error?.message} label="Email" />
						)}
					/>
					<Controller
						control={control}
						name="password"
						render={({ field, fieldState: { error } }) => (
							<AppTextField
								label="password"
								type="password"
								{...field}
								error={!!error}
								helperText={error?.message}
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
						disabled={isLoading}
						endIcon={isLoading ? <AppCircularProgress size={25} color="secondary" /> : null}
					>
						Iniciar sesión
					</AppButton>
				</form>
				<AppDivider
					marginY="0.5rem"
					textAlign="center"
					sx={{
						width: '100%'
					}}
				>
					<AppTypography>Or</AppTypography>
				</AppDivider>

				<AppButton startIcon={<AppIcons.Facebook />} fullWidth variant="outlined">
					Login with Facebook
				</AppButton>

				<AppButton startIcon={<AppIcons.Google />} fullWidth variant="outlined">
					Login with Google
				</AppButton>

				<AppButton startIcon={<AppIcons.Twitter />} fullWidth variant="outlined">
					Login with Twitter
				</AppButton>
			</AppPaper>
			{/* <AppIconButton
				sx={{ ml: 1 }}
				onClick={() => {
					colorMode.toggleColorMode()
					document.cookie = `theme=${theme.palette.mode === 'dark' ? 'light' : 'dark'}; path=/`
				}}
				color="inherit"
			>
				{theme.palette.mode === 'dark' ? <AppIcons.Brightness4 /> : <AppIcons.Brightness7 />}
			</AppIconButton> */}
		</AppGrid>
	)
}
