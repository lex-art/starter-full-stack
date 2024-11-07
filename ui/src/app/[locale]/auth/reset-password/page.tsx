'use client'
import { resetPasswordAction } from '@/actions/auth/reset-password.action'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppCircularProgress from '@/components/Common/FeedBack/CircularProgress/CircularProgress'
import AppButton from '@/components/Common/Inputs/Button/Button'
import AppIconButton from '@/components/Common/Inputs/IconButton/IconButton'
import AppTextField from '@/components/Common/Inputs/TextField/TextField'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import AppPaper from '@/components/Common/Layout/Paper'
import { useAppTheme } from '@/components/Theme/AppTheme'
import {
	Link,
	usePathname,
	useRouter
} from '@/i18n/routing'
import { Severity } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Visibility,
	VisibilityOff
} from '@mui/icons-material'
import { useTheme } from '@mui/material'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import {
	redirect as i18Redirect,
	useSearchParams
} from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import logo from '../../../../../public/img/react.png'
import {
	NewPasswordSchema,
	newPasswordSchema
} from '../../../schemas/users/user'

export default function ResetPassword() {
	const t = useTranslations('common')
	const { enqueueSnackbar } = useSnackbar()
	const colorMode = useAppTheme()
	const theme = useTheme()
	const searchParams = useSearchParams()
	const locale = useLocale()
	const redirect = useRouter()
	const pathname = usePathname()
	const [isLoading, transaction] = useTransition()
	const [showPassword, setShowPassword] = useState(false)
	const otherLocale = locale === 'es' ? 'en' : 'es'
	const { control, handleSubmit } =
		useForm<NewPasswordSchema>({
			mode: 'onChange',
			resolver: zodResolver(newPasswordSchema),
			defaultValues: {
				password: '',
				confirmPassword: ''
			}
		})

	useEffect(() => {
		transaction(() => {
			if (searchParams.get('error')) {
				enqueueSnackbar(searchParams.get('error'), {
					variant: Severity.Error
				})
			}
		})
	}, [searchParams])

	const onSubmit = async (data: any) => {
		const token = searchParams.get('token')
		console.log('====================================')
		console.log(token)
		console.log('====================================')
		console.log(data)
		const res = await resetPasswordAction<{
			message: string
			error?: string
		}>(data.password, data.confirmPassword, token)
		if (res.message === 'Password updated') {
			enqueueSnackbar('Contraseña actualizada', {
				variant: Severity.Success
			})
			i18Redirect('/auth/login')
		}
	}

	const handleShowPassword = () => {
		setShowPassword((prev) => !prev)
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
	return (
		<AppGrid
			container
			display="grid"
			minWidth="100dvw"
			minHeight="100dvh"
			justifyContent="center"
			alignItems="center"
			height="100%"
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
					Cambiar Contraseña
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
					onSubmit={handleSubmit(onSubmit)}
					style={{
						margin: 0,
						padding: 0,
						boxSizing: 'border-box'
					}}
				>
					<Controller
						name="password"
						control={control}
						render={({ field, fieldState }) => (
							<AppTextField
								value={field.value}
								onChange={field.onChange}
								onBlur={field.onBlur}
								label={t('password')}
								type={showPassword ? 'text' : 'password'}
								fullWidth
								error={!!fieldState.error}
								helperText={fieldState.error?.message}
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
					<Controller
						name="confirmPassword"
						control={control}
						render={({ field, fieldState }) => (
							<AppTextField
								value={field.value}
								onChange={field.onChange}
								onBlur={field.onBlur}
								label={t('confirmPassword')}
								type={showPassword ? 'text' : 'password'}
								fullWidth
								error={!!fieldState.error}
								helperText={fieldState.error?.message}
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
						disabled={isLoading}
						sx={{
							mt: 1
						}}
						endIcon={
							isLoading ? (
								<AppCircularProgress
									size={25}
									color="secondary"
								/>
							) : null
						}
					>
						{t('resetPassword')}
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
