'use client'
import { createUserAction } from '@/actions/users/create.action'
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
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function CreateUser() {
	const t = useTranslations()
	const { enqueueSnackbar } = useSnackbar()
	const route = useRouter()
	const [isLoading, transaction] = useTransition()
	const {
		control,
		register,
		handleSubmit,
		setValue,
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
	const onSubmit = (data: NewUserSchema) => {
		console.log(data)
		transaction(async () => {
			const result = await createUserAction(data)
			if (result.error) {
				console.error('Error:', result.error)
				enqueueSnackbar(
					JSON.stringify(result.error, null, 2),
					{
						variant: 'error'
					}
				)
				return
			}
			route.push('/users/list')
			console.log('====================================')
			console.log(result)
			console.log('====================================')
		})
	}

	return (
		<AppGrid spacing={2}>
			<AppTypography variant="subtitle1">
				Create User
			</AppTypography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<AppFormContainer>
					<AppFormControl>
						<AppFormLabel>
							Información del usuario
						</AppFormLabel>

						<AppTextField
							label="Nombre"
							{...register('firstName')}
							error={!!errors.firstName}
							helperText={errors.firstName?.message}
						/>
					</AppFormControl>

					<AppFormControl>
						<AppTextField
							style={{ marginTop: 20 }}
							label="Apellido"
							{...register('lastName')}
							error={!!errors.firstName}
							helperText={errors.firstName?.message}
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
									if (
										info.countryCode &&
										info.countryCallingCode
									) {
										setValue(
											'countryCode',
											info?.countryCode
										)
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
					<AppTextField
						label="Dirección"
						{...register('address')}
						error={!!errors.address}
						helperText={errors.address?.message}
					/>
				</AppFormContainer>

				<AppFormContainer
					gridAreaTemplateColumns="repeat(auto-fit, minmax(30rem, 1fr))"
					sx={{
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<AppTextField
						label="Correo electrónico"
						{...register('email')}
						error={!!errors.email}
						helperText={errors.email?.message}
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
								onChange={(e) =>
									field.onChange(e.target.value)
								}
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
								onChange={(e) =>
									field.onChange(e.target.value)
								}
							/>
						)}
					/>

					<Controller
						control={control}
						name="permissions"
						render={({ field, fieldState }) => (
							<AppDropdown
								label="Permisos"
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
								onChange={(e) =>
									field.onChange(e.target.value)
								}
							/>
						)}
					/>
				</AppFormContainer>
				<AppButton
					type="submit"
					disabled={!isValid || !isLoading}
					loading={isLoading}
				>
					{t('common.submit')}
				</AppButton>
			</form>
		</AppGrid>
	)
}
