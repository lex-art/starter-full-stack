'use client'
import AppAutocomplete from '@/components/Common/Autocomplete/Autocomplete'
import AppPaper from '@/components/Common/Containers/Paper'
import { ClearIcon } from '@mui/x-date-pickers'
import React, { ChangeEvent, useRef, useState } from 'react'
const suggestions = [
	{ label: 'Afghanistan', value: 'AF' },
	{ label: 'Albania', value: 'AL' },
	{ label: 'Algeria', value: 'DZ' },
	{ label: 'Andorra', value: 'AD' },
	{ label: 'Angola', value: 'AO' }
	// Add more suggestions here
]

export default function AutocompleteExample() {
	const [value, setValue] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const debounceRef = useRef<ReturnType<typeof setTimeout>>()

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
	}

	const handleOnInputValueChange = (input: string) => {
		if (value === '') {
			setValue('')
		} else {
			setIsLoading(true)
			if (debounceRef.current) {
				clearTimeout(debounceRef.current)
			}
			debounceRef.current = setTimeout(() => {
				// Simulate a request to the server
				setValue(input)
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
			<AppAutocomplete
				value={value}
				options={suggestions}
				label="Autocomplete"
				onSelectValue={handleChange}
				loading={isLoading}
				onInputValueChange={handleOnInputValueChange}
				getOptionLabel={(option: any) => option?.label ?? ''}
				isOptionEqualToValue={(option, value) => (option as any).value === value}
				clearIcon={!isLoading && <ClearIcon fontSize="small" />}
			/>
			<AppAutocomplete
				options={suggestions}
				label="Autocomplete"
				onSelectValue={function (value: unknown): void {
					throw new Error('Function not implemented.')
				}}
				variant="standard"
			/>
			<AppAutocomplete
				options={suggestions}
				label="Autocomplete"
				onSelectValue={function (value: unknown): void {
					throw new Error('Function not implemented.')
				}}
				variant="filled"
			/>
			<AppAutocomplete
				options={suggestions}
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
