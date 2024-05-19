import TextField from '@mui/material/TextField'
import React, { ReactNode, forwardRef } from 'react'
import { NumberFormatValues, NumericFormat, NumericFormatProps } from 'react-number-format'

interface AppNumericFormatBase {
	decimalScale?: number
	prefix?: string
	suffix?: string
	thousandSeparator?: string
	maxLimit?: number
	minLimit?: number
	allowNegative?: boolean
}

interface AppNumericFieldProps extends AppNumericFormatBase {
	id?: string
	autoFocus?: boolean
	disabled?: boolean
	error?: boolean
	fullWidth?: boolean
	helperText?: ReactNode
	label?: React.ReactNode
	multiline?: boolean
	placeholder?: string
	rows?: string | number
	maxRows?: string | number
	minRows?: string | number
	value?: unknown
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	adornment?: ReactNode
	adornmentPosition?: 'end' | 'start'
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
	variant?: 'standard' | 'filled' | 'outlined'
	onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

interface AppNumericFormatProps extends AppNumericFormatBase {
	onChange: (event: { target: { value: string } }) => void
}

const AppNumericFormat = forwardRef<NumericFormatProps, AppNumericFormatProps>(
	function NumericFormatCustom(props, ref) {
		const { onChange, thousandSeparator = ',', maxLimit, minLimit, ...other } = props

		return (
			<NumericFormat
				{...other}
				getInputRef={ref}
				onValueChange={(values: { value: string }) => {
					onChange({
						target: {
							value: values.value
						}
					})
				}}
				thousandSeparator={thousandSeparator}
				valueIsNumericString
				isAllowed={(values: NumberFormatValues) => {
					const { floatValue } = values
					if (maxLimit !== undefined && floatValue && floatValue > maxLimit) {
						return false
					}

					if (minLimit !== undefined && floatValue && floatValue < minLimit) {
						return false
					}
					return true
				}}
			/>
		)
	}
)
//*************************** tohoger inputs *************************************** */

export const AppNumericField = forwardRef<HTMLDivElement, AppNumericFieldProps>((props, ref) => {
	const {
		decimalScale,
		prefix,
		suffix,
		thousandSeparator,
		maxLimit,
		minLimit,
		allowNegative,
		error,
		helperText,
		onBlur,
		onFocus,
		variant = 'outlined',
		onKeyDown,
		...rest
	} = props

	const numericFormatValues: AppNumericFormatBase = {
		decimalScale,
		prefix,
		suffix,
		thousandSeparator,
		maxLimit,
		minLimit,
		allowNegative
	}
	/* return (
		<TextField
			{...rest}
			ref={ref}
			error={error}
			sx={{
				'& .MuiInputLabel-root': {
					top: error ? '-8%' : undefined
				}
			}}
			helperText={helperText}
			variant={variant}
			onBlur={onBlur}
			onFocus={onFocus}
			onKeyDown={onKeyDown}
			InputProps={{
				inputComponent: AppNumericFormat as any,
				inputProps: numericFormatValues,
				style: {
					paddingLeft: '1.4rem !important'
				}
			}}
		/>
	) */
	return (
		<NumericFormat
			{...rest}
			value={rest.value as string | number | null | undefined} // Cast the value prop to string
			onBlur={onBlur}
			onFocus={onFocus}
			onKeyDown={onKeyDown}
			customInput={TextField}
		/>
	)
})

AppNumericField.displayName = 'AppNumericField'
