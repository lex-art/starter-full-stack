'use client'
import AppAutocomplete from '@/components/Common/Autocomplete/Autocomplete'
import AppPaper from '@/components/Common/Containers/Paper'
import AppTypography from '@/components/Common/Typography/Typography'
import { suggestionsAutocomplete } from '@/lib/utilities/constants'
import { ClearIcon } from '@mui/x-date-pickers'
import React, { useRef, useState } from 'react'

type valueMultiple = Record<string, unknown>

export default function AutocompleteExample() {
	const [value, setValue] = useState<{ name: string; value: string } | null>({
		name: 'Angola',
		value: 'AO'
	})
	const [valueMultiple, setValueMultiple] = useState<valueMultiple[]>([
		{ name: 'Afghanistan', value: 'AF' },
		{ name: 'Albania', value: 'AL' }
	])
	const [isLoading, setIsLoading] = useState(false)
	const debounceRef = useRef<ReturnType<typeof setTimeout>>()

	const handleChange = (event: { name: string; value: string } | string) => {
		if (typeof event === 'string') {
			setValue(null)
			return
		}
		setValue(event)
	}

	const handleMultipleChange = (event: valueMultiple[]) => {
		setValueMultiple(event)
	}

	const handleOnInputValueChange = (input: string) => {
		if (value?.value === '') {
			setValue(null)
		} else {
			setIsLoading(true)
			if (debounceRef.current) {
				clearTimeout(debounceRef.current)
			}
			debounceRef.current = setTimeout(() => {
				// Simulate a request to the server
				setIsLoading(false)
			}, 500)
		}
	}
	return (
		<AppPaper
			elevation={5}
			sx={{
				padding: 2
			}}
		>
			<AppTypography variant="body1" fontWeight="bold" mb={1}>
				Types of Autocomplete
			</AppTypography>
			<AppAutocomplete
				value={value}
				freeSolo={false}
				options={suggestionsAutocomplete}
				label="Autocomplete"
				onSelectValue={handleChange}
				loading={isLoading}
				onInputValueChange={handleOnInputValueChange}
				getOptionLabel={(option: any) => option?.label ?? ''}
				isOptionEqualToValue={(option, value) => (option as any)?.value}
				clearIcon={!isLoading && <ClearIcon fontSize="small" />}
			/>
			<AppAutocomplete
				options={suggestionsAutocomplete}
				label="Multiple Autocomplete"
				value={valueMultiple}
				multiple
				onSelectValue={handleMultipleChange}
				loading={isLoading}
				onInputValueChange={handleOnInputValueChange}
				getOptionLabel={(option: any) => option?.label ?? ''}
				isOptionEqualToValue={(option, value) =>
					(option as valueMultiple)?.value === (value as valueMultiple)?.value
				}
				clearIcon={!isLoading && <ClearIcon fontSize="small" />}
				variant="standard"
			/>
			<AppAutocomplete
				options={suggestionsAutocomplete}
				label="Autocomplete"
				onSelectValue={function (value: unknown): void {
					throw new Error('Function not implemented.')
				}}
				variant="filled"
			/>
			<AppAutocomplete
				options={suggestionsAutocomplete}
				label="Autocomplete"
				onSelectValue={function (value: unknown): void {
					throw new Error('Function not implemented.')
				}}
				error
				helperText="This is an error message"
			/>
		</AppPaper>
	)
}
