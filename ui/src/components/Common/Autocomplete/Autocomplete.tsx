'use client'
import { Autocomplete, AutocompleteProps, AutocompleteRenderInputParams, ThemeOptions } from '@mui/material'
import { SyntheticEvent, forwardRef } from 'react'
import { font } from '@/lib/design-tokens'
import AppGrid from '../Grid/Grid'
import AppCircularLoader from '../CircularLoader/CicularLoader'
import AppTextField, { AppTextFieldProps } from '../TextField/TextField'
import { Padding } from '@mui/icons-material'

export interface AppAutocompleteProps extends Partial<AutocompleteProps<unknown, boolean, boolean, boolean>> {
	label?: AppTextFieldProps['label']
	placeholder?: AppTextFieldProps['placeholder']
	variant?: AppTextFieldProps['variant']
	error?: AppTextFieldProps['error']
	helperText?: AppTextFieldProps['helperText']
	minLength?: number
	options: Array<unknown>
	onSelectValue: (value: any) => void
	inputValue?: string
	onInputValueChange?: (input: string) => void
	loading?: boolean
	warning?: boolean
	disableClearable?: boolean
	size?: 'small' | 'medium'
	height?: 'small' | 'medium' | 'smaller'
}

const AppAutocompleteTheme: ThemeOptions = {
	components: {
		MuiAutocomplete: {
			defaultProps: {
				inputMode: 'search'
			},
			styleOverrides: {
				root: {
					'&.MuiAutocomplete-hasPopupIcon .MuiAutocomplete-inputRoot, &.MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot':
						{
							padding: '0 4rem 0 1rem'
						},
					'& .MuiAutocomplete-endAdornment': {
						height: '3rem',
						top: 'calc(50% - 22px)',
						'& .MuiAutocomplete-clearIndicator ': {
							'& .MuiSvgIcon-root': {
								fontSize: '2.8rem',
								height: '3rem',
								width: '3rem'
							},
							'& .MuiSvgIcon-fontSizeMedium ': {
								fontSize: '3rem',
								margin: '0',
								padding: '0'
							}
						},
						'& .MuiAutocomplete-popupIndicator ': {
							'& .MuiSvgIcon-root': {
								fontSize: '2.8rem',
								height: '4rem',
								width: '4rem'
							},
							'& .MuiSvgIcon-fontSizeMedium ': {
								fontSize: '4rem',
								margin: '0',
								padding: '0'
							}
						}
					}
				},
				listbox: {
					fontSize: font.sizes.fontSizeLarge
				},
				option: {
					fontSize: font.sizes.fontSizeLarge
				},
				noOptions: {
					fontSize: font.sizes.fontSizeLarge
				},
				loading: {
					fontSize: font.sizes.fontSizeLarge
				}
			}
		}
	}
}

const AppAutocomplete = forwardRef<HTMLDivElement, AppAutocompleteProps>(
	(
		{ helperText, error, placeholder, label, variant, onSelectValue, onInputValueChange, loading, ...props },
		ref
	) => {
		const renderInput = (params: AutocompleteRenderInputParams) => (
			<AppTextField
				helperText={helperText}
				error={error}
				placeholder={placeholder}
				label={label}
				variant={variant}
				adornment={
					loading ? (
						<AppGrid marginX="0rem" mt="0.4rem">
							<AppCircularLoader size={25} />
						</AppGrid>
					) : null
				}
				{...params}
			/>
		)
		const onChange = (_: SyntheticEvent<Element, Event>, newValue: unknown) => {
			onSelectValue(newValue)
		}

		const onInputChange = (_: React.SyntheticEvent<Element, Event>, newInputValue: string) => {
			onInputValueChange?.(newInputValue)
		}

		return (
			<Autocomplete
				ref={ref}
				onInputChange={onInputChange}
				onChange={onChange}
				style={{ marginBottom: helperText ? '3rem' : '2rem' }}
				renderInput={renderInput}
				loading={loading}
				{...props}
			/>
		)
	}
)

AppAutocomplete.displayName = 'App Autocomplete'

export { AppAutocomplete, AppAutocompleteTheme }
export default AppAutocomplete
