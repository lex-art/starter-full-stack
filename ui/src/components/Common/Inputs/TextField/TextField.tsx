import { colors, font, sizes } from '@/lib/designTokens'
import InputAdornment from '@mui/material/InputAdornment'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { ThemeOptions } from '@mui/material/styles'
import { ChangeEvent, FocusEvent, InputHTMLAttributes, ReactNode, Ref, forwardRef } from 'react'

const AppTextFieldThemeOptions: ThemeOptions = {
	components: {
		MuiTextField: {
			defaultProps: {
				variant: 'outlined',
				fullWidth: true
			}
		},
		MuiInput: {
			styleOverrides: {
				root: {
					fontSize: font.sizes.fontSizeMedium + 2
				}
			}
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					fontSize: font.sizes.fontSizeMedium + 2,
					'& .MuiOutlinedInput-input': {
						padding: '0 0.5rem'
					}
				}
			}
		},
		MuiFilledInput: {
			styleOverrides: {
				root: {
					fontSize: font.sizes.fontSizeMedium + 2,
					paddingBottom: '1rem',
					color: colors.light.white,
					backgroundColor: colors.light.primaryLight,
					'&:hover': {
						backgroundColor: colors.light.primaryLight
					},
					'&.Mui-focused': {
						backgroundColor: colors.light.primaryLight
					}
				},
				sizeSmall: {
					paddingBottom: '1.5rem'
				}
			}
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					fontSize: font.sizes.fontSizeMedium + 2,
					height: sizes.medium,
					margin: '0.7rem 0',
					padding: '0',
					'&.MuiOutlinedInput-root': {
						paddingLeft: '0.5rem'
					},
					'& .MuiOutlinedInput-notchedOutline': {
						padding: '0 .9rem'
					},
					'& .MuiOutlinedInput-notchedOutline > legend': {
						fontSize: font.sizes.fontSizeMedium
					},
					//for number input
					'& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
						display: 'none'
					},
					'& input[type=number]': {
						MozAppearance: 'textfield'
					}
				},
				sizeSmall: {
					fontSize: font.sizes.fontSizeSmall,
					height: sizes.small,
					margin: '1rem 0',
					padding: '0',
					'& .MuiOutlinedInput-notchedOutline': {
						padding: '0 .9rem'
					},
					'& .MuiOutlinedInput-notchedOutline > legend': {
						fontSize: font.sizes.fontSizeMedium - 1
					},
					//for number input
					'& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
						display: 'none'
					},
					'& input[type=number]': {
						MozAppearance: 'textfield'
					}
				},
				multiline: {
					height: 'auto',
					'&.MuiOutlinedInput-root': {
						//height: 'auto',
						//margin: '1rem 0 0 0.25rem',
						//top: '-8%'
					}
				}
			}
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					fontSize: font.sizes.fontSizeMedium + 2,
					'&.MuiInputLabel-outlined': {
						'&.Mui-focused, &.MuiFormLabel-filled': {
							transform: 'translate(14px, -4px) scale(0.9)'
						}
					},
					'&.MuiInputLabel-standard': {
						'&.Mui-focused, &.MuiFormLabel-filled': {
							transform: 'translate(0, 4px) scale(0.9)'
						}
					},
					'&.MuiInputLabel-filled': {
						color: colors.light.white,
						'&.Mui-focused, &.MuiFormLabel-filled': {
							transform: 'translate(12px, -7px) scale(0.9)'
						}
					}
				},
				sizeSmall: {
					'&.MuiInputLabel-outlined': {
						top: '10%',
						'&.Mui-focused, &.MuiFormLabel-filled': {
							transform: 'translate(14px, -8px) scale(0.9)'
						}
					}
				}
			}
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					fontSize: font.sizes.fontSizeMedium,
					marginTop: '-0.5rem',
					marginLeft: '0.8rem'
				}
			}
		}
	}
}

export interface AppTextFieldProps {
	id?: string
	autoFocus?: boolean
	disabled?: boolean
	error?: boolean
	fullWidth?: boolean
	helperText?: ReactNode
	label?: ReactNode
	multiline?: boolean
	placeholder?: string
	rows?: string | number
	maxRows?: string | number
	minRows?: string | number
	value?: unknown
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void
	adornmentRight?: ReactNode
	adornmentLeft?: ReactNode
	hiddenLabel?: boolean
	inputProps?: InputHTMLAttributes<HTMLInputElement> & { ref?: Ref<HTMLInputElement> }
	warning?: boolean
	maxLength?: number
	variant?: 'standard' | 'filled' | 'outlined'
	onBlur?: (event: FocusEvent<HTMLInputElement>) => void
	onFocus?: (event: FocusEvent<HTMLInputElement>) => void
}

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
const AppTextField = forwardRef<HTMLDivElement, TextFieldProps & AppTextFieldProps>((props, ref) => {
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
									<>
										<InputAdornment position="end">{adornmentRight}</InputAdornment>
									</>
								)
							}
						: {}),
					...(adornmentLeft
						? {
								startAdornment: (
									<>
										<InputAdornment position="start">{adornmentLeft}</InputAdornment>
									</>
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
export { AppTextField, AppTextFieldThemeOptions }
export default AppTextField
