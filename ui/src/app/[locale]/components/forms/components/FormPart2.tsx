import React from 'react'
import { z } from 'zod'
import { advancedValidationSchema } from '../utils/validations/advancedSchema'
import { Controller, useFormContext } from 'react-hook-form'
import AppFormGroup from '@/components/Common/FormControl/FormGroup'
import AppNumericField from '@/components/Common/Inputs/NumericField/NumericField'
import AppTelInput from '@/components/Common/Inputs/TelInput/TelInput'
import AppDropdown from '@/components/Common/Inputs/Dropdown/Dropdown'
import { countries } from '@/lib/utilities/constants'
import { NumberFormatValues } from 'react-number-format'
import AppTextField from '@/components/Common/Inputs/TextField/TextField'

type AdvancedSchema = z.infer<typeof advancedValidationSchema>
export default function FormPart2() {
	const { control } = useFormContext<AdvancedSchema>()
	return (
		<AppFormGroup>
			<Controller
				name="weight"
				control={control}
				render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
					<AppNumericField
						value={value ? value.toString() : ''}
						onChange={(values: NumberFormatValues) => onChange(values.floatValue)}
						error={!!error}
						helperText={error?.message}
						label="Weight"
					/>
				)}
			/>
			<Controller
				name="plan"
				control={control}
				render={({ field, fieldState: { error } }) => (
					<AppTextField {...field} error={!!error} helperText={error?.message} label="Plan" />
				)}
			/>
			<Controller
				name="phone"
				control={control}
				render={({ field, fieldState: { error } }) => (
					<AppTelInput
						{...field}
						error={!!error}
						helperText={error?.message}
						label="Phone"
						defaultCountryCode="US"
					/>
				)}
			/>
			<Controller
				name="country"
				control={control}
				render={({ field: { value, ...rest }, fieldState: { error } }) => (
					<AppDropdown
						options={countries}
						value={value ?? ''}
						{...rest}
						error={!!error}
						helperText={error?.message}
						label="Country"
					/>
				)}
			/>
		</AppFormGroup>
	)
}
