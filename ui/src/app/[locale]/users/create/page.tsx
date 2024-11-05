'use client'
import {
	UserSchema,
	userSchema
} from '@/app/schemas/users/user.schema'
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
import { Controller, useForm } from 'react-hook-form'

export default function CreateUser() {
	const t = useTranslations()
	const {
		control,
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm<UserSchema>({
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
		resolver: zodResolver(userSchema)
	})
	const onSubmit = (data: UserSchema) => {
		console.log(data)
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
							error={!!errors.email}
							helperText={errors.email?.message}
						/>
					</AppFormControl>
					<AppFormControl>
						<AppTextField
							style={{ marginTop: 20 }}
							label="username"
							{...register('username')}
							error={!!errors.username}
							helperText={errors?.username?.message}
						/>
					</AppFormControl>
				</AppFormContainer>
				<AppFormContainer gridAreaTemplateColumns="repeat(auto-fit, minmax(30rem, 1fr))">
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

				<AppFormContainer gridAreaTemplateColumns="repeat(auto-fit, minmax(30rem, 1fr))">
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
									{ name: 'Admin', value: 'admin' },
									{ name: 'User', value: 'user' }
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
						name="type"
						render={({ field, fieldState }) => (
							<AppDropdown
								label="Tipo"
								options={[
									{ name: 'Admin', value: 'admin' },
									{ name: 'User', value: 'user' }
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

					<AppTextField
						label="Permisos"
						{...register('permissions')}
						error={!!errors.permissions}
						helperText={errors.permissions?.message}
					/>
				</AppFormContainer>
				<AppButton type="submit">
					{t('common.submit')}
				</AppButton>
			</form>
		</AppGrid>
	)
}
