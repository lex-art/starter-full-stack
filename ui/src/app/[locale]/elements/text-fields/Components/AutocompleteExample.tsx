'use client'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppAutocomplete from '@/components/Common/Inputs/Autocomplete/Autocomplete'
import AppPaper from '@/components/Common/Layout/Paper'
import { suggestionsArrayExample } from '@/lib/utilities/constants'
import { ClearIcon } from '@mui/x-date-pickers'
import { useRef, useState } from 'react'

type valueMultiple = Record<string, unknown>

export default function AutocompleteExample() {
	const [value, setValue] = useState<{
		name: string
		value: string
	} | null>({
		name: 'Angola',
		value: 'AO'
	})
	const [valueMultiple, setValueMultiple] = useState<valueMultiple[]>([
		{ name: 'Afghanistan', value: 'AF' },
		{ name: 'Albania', value: 'AL' }
	])
	const [isLoading, setIsLoading] = useState(false)
	const debounceRef = useRef<ReturnType<typeof setTimeout>>()

	const handleChange = (
		event: { name: string; value: string } | string
	) => {
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
				options={suggestionsArrayExample}
				label="Autocomplete"
				onSelectValue={handleChange}
				loading={isLoading}
				onInputValueChange={handleOnInputValueChange}
				getOptionLabel={(option: any) => option?.name || ''}
				isOptionEqualToValue={(option, value) => (option as any)?.name}
				clearIcon={!isLoading && <ClearIcon fontSize="small" />}
			/>
			<AppAutocomplete
				options={suggestionsArrayExample}
				label="Multiple Autocomplete"
				value={valueMultiple}
				multiple
				onSelectValue={handleMultipleChange}
				loading={isLoading}
				onInputValueChange={handleOnInputValueChange}
				getOptionLabel={(option: any) => option?.name || ''}
				isOptionEqualToValue={(option, value) =>
					(option as valueMultiple)?.name ===
					(value as valueMultiple)?.name
				}
				clearIcon={!isLoading && <ClearIcon fontSize="small" />}
				variant="standard"
			/>
			<AppAutocomplete
				options={suggestionsArrayExample}
				label="Autocomplete"
				onSelectValue={function (value: unknown): void {
					throw new Error('Function not implemented.')
				}}
				variant="filled"
				getOptionLabel={(option: any) => option?.name || ''}
			/>
			<AppAutocomplete
				options={suggestionsArrayExample}
				label="Autocomplete"
				onSelectValue={function (value: unknown): void {
					throw new Error('Function not implemented.')
				}}
				error
				helperText="This is an error message"
				getOptionLabel={(option: any) => option?.name || ''}
			/>
		</AppPaper>
	)
}
