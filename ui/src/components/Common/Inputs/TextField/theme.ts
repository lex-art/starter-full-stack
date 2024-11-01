import { colors, font, sizes } from '@/lib/designTokens'
import { ThemeOptions } from '@mui/material'
import {
	ChangeEvent,
	FocusEvent,
	InputHTMLAttributes,
	ReactNode,
	Ref
} from 'react'

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
	inputProps?: InputHTMLAttributes<HTMLInputElement> & {
		ref?: Ref<HTMLInputElement>
	}
	warning?: boolean
	maxLength?: number
	variant?: 'standard' | 'filled' | 'outlined'
	onBlur?: (event: FocusEvent<HTMLInputElement>) => void
	onFocus?: (event: FocusEvent<HTMLInputElement>) => void
}

export const AppTextFieldThemeOptions: ThemeOptions = {
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
					margin: '0.8rem 0',
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
					'& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
						{
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
					'& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
						{
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
