'use client'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import { signIn } from 'next-auth/react'
import React, { FormEventHandler } from 'react'
import Image from 'next/image'
import logo from '../../../../../public/img/react.png'
import AppPaper from '@/components/Common/Layout/Paper'
import AppFormGroup from '@/components/Common/FormControl/FormGroup'
import AppTextField from '@/components/Common/Inputs/TextField/TextField'
import AppButton from '@/components/Common/Inputs/Button/Button'
import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppIcons from '@/components/Common/Icons/Icons'
import AppBox from '@/components/Common/Layout/Box'

export default function Login() {
	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault()
		const username = (event.target as HTMLFormElement)?.username.value
		const password = (event.target as HTMLFormElement)?.password.value

		const result = await signIn('credentials', {
			redirect: true, // Evita redirecciones automáticas
			username,
			password,
			callbackUrl: '/'
		})
		if (result?.error) {
			// Manejar errores, por ejemplo mostrando un mensaje al usuario
			console.error(result.error)
		}
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
					maxWidth: 300,
					width: 300,
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
					onSubmit={handleSubmit}
				>
					<AppTextField fullWidth label="username" />
					<AppTextField fullWidth label="password" type="password" />

					{/* <label htmlFor="username">Usuario:</label>
					<input type="text" id="username" name="username" required />

					<label htmlFor="password">Contraseña:</label>
					<input type="password" id="password" name="password" required />

					<button type="submit">Iniciar sesión</button> */}
					<AppButton
						type="submit"
						fullWidth
						sx={{
							mt: 1
						}}
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
