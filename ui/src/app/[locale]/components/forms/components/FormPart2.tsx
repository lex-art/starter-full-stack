import React from 'react'
import { z } from 'zod'
import { advancedValidationSchema } from '../utils/validations/advancedSchema'
import { Controller, useFormContext } from 'react-hook-form'
import AppFormGroup from '@/components/Common/FormControl/FormGroup'
import AppNumericField from '@/components/Common/Inputs/NumericField/NumericField'
import AppTelInput from '@/components/Common/Inputs/TelInput/TelInput'
import AppDropdown from '@/components/Common/Inputs/Dropdown/Dropdown'
import { countries } from '@/lib/utilities/constants'

type AdvancedSchema = z.infer<typeof advancedValidationSchema>
export default function FormPart2() {
	const { control } = useFormContext<AdvancedSchema>()
	return (
		<AppFormGroup>
			<Controller
				name="weight"
				control={control}
				render={({ field, fieldState: { error } }) => (
					<AppNumericField {...field} error={!!error} helperText={error?.message} label="Weight" />
				)}
			/>
			<Controller
				name="plan"
				control={control}
				render={({ field, fieldState: { error } }) => (
					<AppNumericField {...field} error={!!error} helperText={error?.message} label="Plan" />
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
				render={({ field, fieldState: { error } }) => (
					<AppDropdown
						options={countries}
						{...field}
						error={!!error}
						helperText={error?.message}
						label="Country"
					/>
				)}
			/>
		</AppFormGroup>
	)
}
