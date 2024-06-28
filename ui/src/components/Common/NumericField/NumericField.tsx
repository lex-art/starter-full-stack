import React, { ReactNode, forwardRef } from 'react'
import { NumberFormatValues, NumericFormat, OnValueChange } from 'react-number-format'
import AppTextField from '../TextField/TextField'
import AppIcons from '../Icons/Icons'
import { InputAdornment } from '@mui/material'

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
	value?: string | number | null | undefined
	onChange: OnValueChange
	adornment?: ReactNode
	adornmentPosition?: 'end' | 'start'
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
	variant?: 'standard' | 'filled' | 'outlined'
	onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
	allowLeadingZeros?: boolean
	maxLength?: number
	currency?: 'USD' | 'EU' | 'GTQ' | 'MXN'
	size?: 'small' | 'medium'
}

/**
 * App text field component
 * @param {AppNumericFieldProps} props
 * @param {string} [props.id] The id of the input element.
 * @param {boolean} [props.autoFocus] If true, the input element will be focused during the first mount.
 * @param {boolean} [props.disabled] If true, the input element will be disabled.
 * @param {boolean} [props.error] If true, the label will be displayed in an error state.
 * @param {boolean} [props.fullWidth] If true, the input element will take up the full width of its container.
 * @param {ReactNode} [props.helperText] The helper text content.
 * @param {ReactNode} [props.label] The label content.
 * @param {boolean} [props.multiline] If true, the component will be a multiline text field.
 * @param {string} [props.placeholder] The short hint displayed in the input before the user enters a value.
 * @param {string | number} [props.rows] The number of rows to display when multiline option is set to true.
 * @param {string | number} [props.maxRows] The maximum number of rows to display when multiline option is set to true.
 * @param {string | number} [props.minRows] The minimum number of rows to display when multiline option is set to true.
 * @param {string | number | null | undefined} [props.value] The value of the input element, required for a controlled component.
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} props.onChange The callback fired when the value is changed.
 * @param {ReactNode} [props.adornment] The content of the component.
 *  */
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
		allowLeadingZeros,
		maxLength,
		value,
		onChange,
		currency,
		...rest
	} = props

	return (
		<NumericFormat
			{...rest}
			getInputRef={ref}
			value={value} // Cast the value prop to string
			onValueChange={onChange}
			onBlur={onBlur}
			onFocus={onFocus}
			onKeyDown={onKeyDown}
			customInput={AppTextField}
			suffix={suffix}
			prefix={prefix}
			decimalScale={decimalScale}
			thousandSeparator={thousandSeparator}
			max={maxLimit}
			min={minLimit}
			maxLength={maxLength}
			allowNegative={allowNegative}
			error={error}
			helperText={helperText}
			variant={variant}
			adornment={
				<InputAdornment component="div" position="start">
					{currency === 'USD' && <AppIcons.AttachMoney fontSize="small" />}
					{currency === 'EU' && <AppIcons.Euro fontSize="small" />}
					{currency === 'GTQ' && <AppIcons.AttachMoney fontSize="small" />}
					{currency === 'MXN' && <AppIcons.AttachMoney fontSize="small" />}
				</InputAdornment>
			}
			adornmentPosition="start"
			onBlurCapture={onBlur}
			allowLeadingZeros={allowLeadingZeros}
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
})

AppNumericField.displayName = 'AppNumericField'
export default AppNumericField
