'use client'
import {
	Autocomplete,
	AutocompleteProps,
	AutocompleteRenderGetTagProps,
	AutocompleteRenderInputParams,
	InputAdornment,
	TextField
} from '@mui/material'
import { SyntheticEvent, forwardRef } from 'react'
import AppChip from '../../DataDisplay/Chip/Chip'
import AppCircularLoader from '../../FeedBack/CircularLoader/CircularLoader'
import AppGrid from '../../Layout/Grid/Grid'
import { AppTextFieldProps } from '../TextField/theme'

export interface AppAutocompleteProps
	extends Partial<AutocompleteProps<unknown, boolean, boolean, boolean>> {
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
}

const AppAutocomplete = forwardRef<HTMLDivElement, AppAutocompleteProps>(
	(
		{
			helperText,
			error,
			placeholder,
			label,
			variant,
			onSelectValue,
			onInputValueChange,
			loading,
			...props
		},
		ref
	) => {
		const renderInput = (params: AutocompleteRenderInputParams) => (
			<TextField
				{...params}
				helperText={helperText}
				error={error}
				placeholder={placeholder}
				label={label}
				variant={variant}
				multiline={props.multiple}
				slotProps={{
					input: {
						...(loading
							? {
									endAdornment: (
										<InputAdornment position="end">
											<AppGrid marginX="0" mt="0.4rem">
												<AppCircularLoader size={25} />
											</AppGrid>
										</InputAdornment>
									)
								}
							: {})
					}
				}}
				/* adornmentRight={
					loading ? (
						<AppGrid marginX="0" mt="0.4rem">
							<AppCircularLoader size={25} />
						</AppGrid>
					) : null
				} */
			/>
		)

		const renderTags = (
			tagValue: unknown[],
			getTagProps: AutocompleteRenderGetTagProps
		) => {
			return tagValue.map((option: any, index: number) => (
				<AppChip
					{...getTagProps({ index })}
					key={index}
					label={option?.name}
				/>
			))
		}

		const onChange = (
			_: SyntheticEvent<Element, Event>,
			newValue: unknown
		) => {
			onSelectValue(newValue)
		}

		const onInputChange = (
			_: React.SyntheticEvent<Element, Event>,
			newInputValue: string
		) => {
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
				renderTags={renderTags}
				{...props}
			/>
		)
	}
)

AppAutocomplete.displayName = 'App Autocomplete'
export default AppAutocomplete
