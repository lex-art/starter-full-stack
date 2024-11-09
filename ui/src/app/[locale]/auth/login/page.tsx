'use client'
import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppCircularProgress from '@/components/Common/FeedBack/CircularProgress/CircularProgress'
import AppIcons from '@/components/Common/Icons/Icons'
import AppButton from '@/components/Common/Inputs/Button/Button'
import AppIconButton from '@/components/Common/Inputs/IconButton/IconButton'
import AppTextField from '@/components/Common/Inputs/TextField/TextField'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import AppPaper from '@/components/Common/Layout/Paper'
import { useAppTheme } from '@/components/Theme/appTheme.context'
import { useRouter as i18nRouter, Link, usePathname } from '@/i18n/routing'
import { Severity } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Toolbar, useTheme } from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import { signIn } from 'next-auth/react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import logo from '../../../../../public/img/react.png'
import { userSchema } from '../../../schemas/users/user'
type UserSchema = z.infer<typeof userSchema>

export default function Login() {
	const { enqueueSnackbar } = useSnackbar()
	const theme = useTheme()
	const colorMode = useAppTheme()
	const t = useTranslations('common')
	const locale = useLocale()
	const redirect = i18nRouter()
	const pathname = usePathname()
	const otherLocale = locale === 'es' ? 'en' : 'es'
	const [isLoading, transaction] = useTransition()
	const [showPassword, setShowPassword] = useState(false)
	const query = useSearchParams()
	const { control, handleSubmit } = useForm<UserSchema>({
		mode: 'onSubmit',
		resolver: zodResolver(userSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	useEffect(() => {
		transaction(() => {
			if (query.get('error')) {
				enqueueSnackbar(query.get('error'), {
					variant: Severity.Error
				})
			}
		})
	}, [query])

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
		})
	}

	const loginWithFacebook = async () => {
		transaction(async () => {
			const result = await signIn('facebook', {
				redirect: false,
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

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault()
	}

	const handleMouseUpPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault()
	}

	const loginWithGoogle = async () => {
		transaction(async () => {
			const result = await signIn('google', {
				redirect: false,
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

	const handleShowPassword = () => {
		setShowPassword((prev) => !prev)
	}

	return (
		<AppGrid
			display="grid"
			justifyContent="center"
			alignItems="center"
			height="100dvh"
			sx={{
				backgroundColor: (theme) => theme.palette.background.default
			}}
		>
			<MuiAppBar>
				<Toolbar
					sx={{
						display: 'flex',
						justifyContent: 'flex-end'
					}}
				>
					<AppIconButton
						sx={{ ml: 1 }}
						onClick={() => {
							colorMode.toggleColorMode()
							document.cookie = `theme=${theme.palette.mode === 'dark' ? 'light' : 'dark'}; path=/`
						}}
						color="inherit"
					>
						{theme.palette.mode === 'dark' ? (
							<AppIcons.Brightness4 />
						) : (
							<AppIcons.Brightness7 />
						)}
					</AppIconButton>
					<AppIconButton
						sx={{ ml: 1 }}
						onClick={() =>
							redirect.push(pathname, {
								locale: otherLocale
							})
						}
						color="inherit"
					>
						{locale === 'es' ? (
							<AppIcons.GTranslate />
						) : (
							<AppIcons.GTranslateRounded />
						)}
					</AppIconButton>
				</Toolbar>
			</MuiAppBar>
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
				<Image src={logo} alt="Logo" width={100} height={100} priority />
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
							<AppTextField
								{...field}
								error={!!error}
								helperText={error?.message}
								label={t('email')}
							/>
						)}
					/>
					<Controller
						control={control}
						name="password"
						render={({ field, fieldState: { error } }) => (
							<AppTextField
								label={t('password')}
								type={showPassword ? 'text' : 'password'}
								{...field}
								error={!!error}
								helperText={error?.message}
								adornmentRight={
									<AppIconButton
										aria-label="toggle password visibility"
										onClick={handleShowPassword}
										onMouseDown={handleMouseDownPassword}
										onMouseUp={handleMouseUpPassword}
									>
										{showPassword ? (
											<Visibility fontSize="small" />
										) : (
											<VisibilityOff fontSize="small" />
										)}
									</AppIconButton>
								}
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
						endIcon={
							isLoading ? (
								<AppCircularProgress size={25} color="secondary" />
							) : null
						}
					>
						{t('login')}
					</AppButton>
				</form>
				<AppDivider marginY="0.5rem" textAlign="center">
					<AppTypography fontWeight="Bold">Or</AppTypography>
				</AppDivider>
				<AppButton
					startIcon={<AppIcons.Facebook />}
					fullWidth
					variant="outlined"
					onClick={loginWithFacebook}
					disabled={isLoading}
					endIcon={
						isLoading ? (
							<AppCircularProgress size={25} color="secondary" />
						) : null
					}
				>
					Login with Facebook
				</AppButton>

				<AppButton
					startIcon={<AppIcons.Google />}
					fullWidth
					variant="outlined"
					onClick={loginWithGoogle}
					loading={isLoading}
				>
					Login with Google
				</AppButton>

				<AppButton
					startIcon={<AppIcons.Twitter />}
					fullWidth
					variant="outlined"
				>
					Login with Twitter
				</AppButton>
				<Link
					style={{
						textDecoration: 'none'
					}}
					href="/auth/forgot-password"
				>
					<AppTypography variant="body2" color="textSecondary">
						Recuperar contraseña
					</AppTypography>
				</Link>
			</AppPaper>
		</AppGrid>
	)
}
