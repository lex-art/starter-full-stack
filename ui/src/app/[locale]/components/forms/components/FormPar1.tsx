import AppFormGroup from '@/components/Common/FormControl/FormGroup'
import React from 'react'
import { advancedValidationSchema } from '../utils/validations/advancedSchema'
import { z } from 'zod'
import { Controller, useFormContext } from 'react-hook-form'
import AppTextField from '@/components/Common/Inputs/TextField/TextField'
import AppDatePicker from '@/components/Common/Inputs/DatePicker/DatePicker'
import dayjs from 'dayjs'

type AdvancedSchema = z.infer<typeof advancedValidationSchema>
export default function FormPart1() {
	const { control } = useFormContext<AdvancedSchema>()
	return (
		<AppFormGroup>
			<Controller
				name="name"
				control={control}
				render={({ field, fieldState: { error } }) => (
					<AppTextField {...field} error={!!error} helperText={error?.message} label="First Name" />
				)}
			/>
			<Controller
				name="email"
				control={control}
				render={({ field, fieldState: { error } }) => (
					<AppTextField {...field} error={!!error} helperText={error?.message} label="Email" />
				)}
			/>
			<Controller
				name="password"
				control={control}
				render={({ field, fieldState: { error } }) => (
					<AppTextField
						type="password"
						{...field}
						error={!!error}
						helperText={error?.message}
						label="Password"
					/>
				)}
			/>
			<Controller
				name="birthDate"
				control={control}
				render={({ field: { value, ...rest }, fieldState: { error } }) => (
					<AppDatePicker
						{...rest}
						maxDate={dayjs(new Date())}
						error={!!error}
						helperText={error?.message}
						label="Nacimiento"
						value={dayjs(value)}
					/>
				)}
			/>
		</AppFormGroup>
	)
}
