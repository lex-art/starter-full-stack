'use client'
import { UserSchema, userSchema } from '@/app/schemas/users/user.schema'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppFormControl from '@/components/Common/FormControl/FormControl'
import AppFormGroup from '@/components/Common/FormControl/FormGroup'
import AppButton from '@/components/Common/Inputs/Button/Button'
import AppTextField from '@/components/Common/Inputs/TextField/TextField'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

export default function CreateUser() {
	const t = useTranslations()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<UserSchema>({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues: {},
		resolver: zodResolver(userSchema)
	})
	const onSubmit = (data: UserSchema) => {
		console.log(data)
	}

	return (
		<AppGrid spacing={2}>
			<AppTypography variant="subtitle1">Create User</AppTypography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<AppFormGroup>
					<AppFormControl>
						<AppTextField
							label={t('common.email')}
							{...register('email')}
							error={!!errors.email}
							helperText={errors.email?.message}
						/>
					</AppFormControl>
					<AppFormControl>
						<AppTextField
							label="username"
							{...register('username')}
							error={!!errors.username}
							helperText={errors?.username?.message}
						/>
					</AppFormControl>
				</AppFormGroup>

				<AppButton type="submit">{t('common.submit')}</AppButton>
			</form>
		</AppGrid>
	)
}
