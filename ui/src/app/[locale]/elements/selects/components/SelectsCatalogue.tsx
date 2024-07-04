'use client'
import AppDropdown from '@/components/Common/Inputs/Dropdown/Dropdown'
import { suggestionsArrayExample } from '@/lib/utilities/constants'
import { SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'

interface SelectsCatalogueProps {
	showError?: boolean
}

export default function SelectsCatalogue({ showError }: SelectsCatalogueProps) {
	const [value1, setValue1] = useState<string>('AF')
	const [value2, setValue2] = useState<string>('')
	const [value3, setValue3] = useState<Array<string>>(['AF', 'AL'])
	const [value4, setValue4] = useState<string>('')

	const handleChange1 = (event: SelectChangeEvent<unknown>) => {
		setValue1(event.target.value as string)
	}

	const handleChange2 = (event: SelectChangeEvent<unknown>) => {
		setValue2(event.target.value as string)
	}

	const handleChange3 = (event: SelectChangeEvent<unknown>) => {
		setValue3(event.target.value as Array<string>)
	}

	const handleChange4 = (event: SelectChangeEvent<unknown>) => {
		setValue4(event.target.value as string)
	}

	return (
		<>
			<AppDropdown
				value={value1}
				onChange={handleChange1}
				options={suggestionsArrayExample}
				label="Select"
				error={showError}
				helperText={showError ? 'This field is required' : ''}
			/>
			<AppDropdown
				value={value2}
				onChange={handleChange2}
				options={suggestionsArrayExample}
				label="Select"
				variant="filled"
				error={showError}
				helperText={showError ? 'This field is required' : ''}
			/>
			<AppDropdown
				options={suggestionsArrayExample}
				variant="standard"
				multiple
				label="Multiple"
				value={value3}
				onChange={handleChange3}
				error={showError}
			/>
			<AppDropdown
				value={value4}
				onChange={handleChange4}
				options={suggestionsArrayExample}
				pills
				label="Pilled"
				error={showError}
				helperText={showError ? 'This field is required' : ''}
			/>
		</>
	)
}
