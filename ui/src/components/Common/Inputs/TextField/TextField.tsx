import InputAdornment from '@mui/material/InputAdornment'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { forwardRef } from 'react'
import { AppTextFieldProps } from './theme'

/**
 * A text field is a basic text input component that enables users to type text into an app.
 * @param id <string>: The id of the `input` element.
 * Use this prop to make `label` and `helperText` accessible for screen readers.
 * @param autoFocus <boolean>: If `true`, the `input` element is focused during the first mount.
 * @default false
 * @param disabled <boolean>: If `true`, the component is disabled.
 * @default false
 * @param error <boolean>: If `true`, the label is displayed in an error state.
 * @default false
 * @param fullWidth <boolean>: If `true`, the input will take up the full width of its container.
 * @default false
 * @param helperText <ReactNode>: The helper text content. Also useful in validation.
 * @param label <ReactNode>: The label content.
 * @param multiline <boolean>: If `true`, a `textarea` element is rendered instead of an input.
 * @default false
 * @param placeholder <string>: The short hint displayed in the `input` before the user enters a value.
 * @param rows <string | number>: Number of rows to display when multiline option is set to true.
 * @param maxRows <string | number>: Maximum number of rows to display when multiline option is set to true.
 * @param minRows <string | number>: Minimum number of rows to display when multiline option is set to true.
 * @param value <unknown>: The value of the `input` element, required for a controlled component.
 * @param onChange <(event: React.ChangeEvent<HTMLInputElement>) => void>: Callback fired when the value is changed.
 * @param type <undefined | 'password'>: Set to 'password' to use a password field
 * @param variant: <'standard' | 'filled' | 'outlined'>: The variant to use. @default 'outlined'
 * @returns component
 */
const AppTextField = forwardRef<
	HTMLDivElement,
	TextFieldProps & AppTextFieldProps
>((props, ref) => {
	const {
		variant,
		adornmentLeft,
		adornmentRight,
		inputProps,
		maxLength,
		onBlur,
		onFocus,
		error,
		multiline,
		...rest
	} = props

	return (
		<TextField
			{...rest}
			ref={ref}
			slotProps={{
				...rest.slotProps,
				htmlInput: {
					...rest.slotProps?.htmlInput,
					maxLength: maxLength
				},
				input: {
					...rest.slotProps?.input,
					...(adornmentRight
						? {
								endAdornment: (
									<InputAdornment position="end">
										{adornmentRight}
									</InputAdornment>
								)
							}
						: {}),
					...(adornmentLeft
						? {
								startAdornment: (
									<InputAdornment position="start">
										{adornmentLeft}
									</InputAdornment>
								)
							}
						: {})
				}
			}}
			multiline={multiline}
			error={error}
			sx={{
				'&.Mui-error': {
					top: '-8%'
				},
				height: 'auto'
			}}
			variant={variant}
			onBlur={onBlur}
			onFocus={onFocus}
		/>
	)
})

AppTextField.displayName = 'AppTextField'
export default AppTextField
