'use client'
import { createUserAction } from '@/actions/users/create.action'
import { getUserAction } from '@/actions/users/get-user.action'
import { updateUserAction } from '@/actions/users/update.action'
import {
	NewUserSchema,
	newUserSchema
} from '@/app/schemas/users/new-user.schema'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppFormContainer from '@/components/Common/FormControl/FormContainer'
import AppFormControl from '@/components/Common/FormControl/FormControl'
import AppFormLabel from '@/components/Common/FormControl/FormLabel'
import AppButton from '@/components/Common/Inputs/Button/Button'
import AppDatePicker from '@/components/Common/Inputs/DatePicker/DatePicker'
import AppDropdown from '@/components/Common/Inputs/Dropdown/Dropdown'
import AppTelInput from '@/components/Common/Inputs/TelInput/TelInput'
import AppTextField from '@/components/Common/Inputs/TextField/TextField'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import { useAppTheme } from '@/components/Theme/appTheme.context'
import { API_URLS } from '@/lib/utilities/emun'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import useSWR from 'swr'

const fetcher = async (url: string) => getUserAction(url)

export default function CreateUser({
	params
}: {
	params: { email: string }
}) {
	const t = useTranslations()
	const { enqueueSnackbar } = useSnackbar()
	const { setIsLoading } = useAppTheme()
	const route = useRouter()
	const [isLoading, transaction] = useTransition()
	const idEmail = atob(params.email)
	const isEditMode = params.email !== 'create'
	const { data } = useSWR(
		isEditMode ? API_URLS.USER_GET.replace(':email', idEmail) : null,
		fetcher
	)
	const {
		control,
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors, isValid }
	} = useForm<NewUserSchema>({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues: {
			firstName: '',
			lastName: '',
			birthDate: undefined,
			phone: '',
			address: '',
			countryCode: '',
			countryCallingCode: '',
			email: '',
			username: '',
			role: '',
			type: '',
			permissions: []
		},
		resolver: zodResolver(newUserSchema)
	})
	useEffect(() => {
		setIsLoading(isEditMode)
		if (data?.error) {
			enqueueSnackbar(JSON.stringify(data.error), {
				variant: 'error'
			})
			setIsLoading(false)
		}
		if (data?.data) {
			const {
				firstName,
				lastName,
				birthDate,
				phone,
				address,
				countryCode,
				countryCallingCode,
				email,
				username,
				role,
				type,
				permissions
			} = data.data
			console.log('====================================')
			console.log({
				firstName,
				lastName,
				birthDate,
				phone,
				address,
				countryCode,
				countryCallingCode,
				email,
				username,
				role,
				type,
				permissions
			})
			console.log('====================================')
			reset({
				firstName,
				lastName,
				birthDate,
				phone,
				address,
				countryCode,
				countryCallingCode,
				email,
				username,
				role,
				type,
				permissions
			})
			setIsLoading(false)
		}
	}, [data?.data, isLoading])

	const onSubmit = (data: NewUserSchema) => {
		console.log('====================================')
		console.log('data', data)
		console.log('====================================')
		transaction(async () => {
			const result = isEditMode
				? await updateUserAction(data)
				: await createUserAction(data)
			if (result.error) {
				console.error('Error:', result.error)
				enqueueSnackbar(JSON.stringify(result.error, null, 2), {
					variant: 'error'
				})
				return
			}
			route.push('/user/list')
		})
	}

	return (
		<AppGrid spacing={2}>
			<AppTypography variant="subtitle1">
				Create User {JSON.stringify(errors, null, 2)}
			</AppTypography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<AppFormContainer>
					<AppFormControl>
						<AppFormLabel>Información del usuario</AppFormLabel>
						<Controller
							control={control}
							name="firstName"
							render={({ field, fieldState }) => (
								<AppTextField
									label="Nombre"
									{...field}
									error={!!fieldState.error}
									helperText={fieldState.error?.message}
								/>
							)}
						/>
					</AppFormControl>

					<AppFormControl>
						<Controller
							control={control}
							name="lastName"
							render={({ field, fieldState }) => (
								<AppTextField
									style={{ marginTop: 20 }}
									label="Apellido"
									{...field}
									error={!!fieldState.error}
									helperText={fieldState.error?.message}
								/>
							)}
						/>
					</AppFormControl>
				</AppFormContainer>
				<AppFormContainer gridAreaTemplateColumns="repeat(auto-fit, minmax(30rem, 1fr))">
					<AppTextField
						label="username"
						{...register('username')}
						error={!!errors.username}
						helperText={errors?.username?.message}
					/>
					<Controller
						control={control}
						name="birthDate"
						render={({ field }) => (
							<AppDatePicker
								label="Fecha de nacimiento"
								name={field.name}
								disabled={field.disabled}
								value={dayjs(field.value ?? null)}
								onChange={(date) => {
									field.onChange(date)
								}}
								error={!!errors.birthDate}
								helperText={errors.birthDate?.message}
								onClear={() => field.onChange(null)}
							/>
						)}
					/>
					<Controller
						control={control}
						name="phone"
						render={({ field, fieldState }) => (
							<AppTelInput
								label="Teléfono"
								defaultCountryCode="GT"
								{...field}
								onChange={(value, info) => {
									field.onChange(value)
									if (info.countryCode && info.countryCallingCode) {
										setValue('countryCode', info?.countryCode)
										setValue(
											'countryCallingCode',
											info?.countryCallingCode
										)
									}
								}}
								error={!!fieldState.error}
								helperText={fieldState.error?.message}
							/>
						)}
					/>
					<Controller
						control={control}
						name="address"
						render={({ field, fieldState }) => (
							<AppTextField
								label="Dirección"
								{...field}
								error={!!fieldState.error}
								helperText={fieldState.error?.message}
							/>
						)}
					/>
				</AppFormContainer>

				<AppFormContainer
					gridAreaTemplateColumns="repeat(auto-fit, minmax(30rem, 1fr))"
					sx={{
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<Controller
						control={control}
						name="email"
						render={({ field, fieldState }) => (
							<AppTextField
								label="Correo electrónico"
								{...field}
								error={!!fieldState.error}
								helperText={fieldState.error?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="role"
						render={({ field, fieldState }) => (
							<AppDropdown
								label="Rol"
								options={[
									{ name: 'Admin', value: 'ADMIN' },
									{ name: 'User', value: 'USER' }
								]}
								clearable
								value={field.value}
								error={!!fieldState.error}
								helperText={fieldState.error?.message}
								onChange={(e) => field.onChange(e.target.value)}
							/>
						)}
					/>

					<Controller
						control={control}
						name="type"
						render={({ field, fieldState }) => (
							<AppDropdown
								label="Tipo"
								options={[
									{ name: 'Estándar', value: 'STANDARD' },
									{ name: 'Invitado', value: 'GUEST' },
									{ name: 'Premium', value: 'PREMIUM' }
								]}
								value={field.value}
								error={!!fieldState.error}
								helperText={fieldState.error?.message}
								onChange={(e) => field.onChange(e.target.value)}
							/>
						)}
					/>

					<Controller
						control={control}
						name="permissions"
						render={({ field, fieldState }) => (
							<AppDropdown
								label="Permisos"
								clearable
								multiple
								options={[
									{ name: 'Todos', value: 'all' },
									{ name: 'leer', value: 'read' },
									{ name: 'escribir', value: 'write' },
									{ name: 'eliminar', value: 'delete' },
									{ name: 'actualizar', value: 'update' },
									{ name: 'crear', value: 'create' }
								]}
								value={field.value}
								error={!!fieldState.error}
								helperText={fieldState.error?.message}
								onChange={(e) => field.onChange(e.target.value)}
							/>
						)}
					/>
				</AppFormContainer>
				<AppButton
					type="submit"
					disabled={!isValid || !isLoading}
					loading={isLoading}
				>
					{isEditMode ? t('common.update') : t('common.submit')}
				</AppButton>
			</form>
		</AppGrid>
	)
}
