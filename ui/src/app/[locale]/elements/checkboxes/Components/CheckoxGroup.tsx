'use client'
import AppFormControl from '@/components/Common/FormControl/FormControl'
import AppFormGroup from '@/components/Common/FormControl/FormGroup'
import AppFormLabel from '@/components/Common/FormControl/FormLabel'
import AppCheckbox from '@/components/Common/Inputs/CheckBox/AppCheckBox'
import AppBox from '@/components/Common/Layout/Box'
import { checkBoxGroupExample } from '@/lib/utilities/constants'
import { useState } from 'react'

export default function CheckBoxGroup() {
	const [checked, setChecked] = useState<string>('')
	const handleChange = (value: string) => {
		setChecked(value)
	}
	return (
		<AppBox display="flex">
			<AppFormControl>
				<AppFormLabel>Checkbox Group unique option</AppFormLabel>
				<AppFormGroup>
					{checkBoxGroupExample.map((item, index) => (
						<AppCheckbox
							key={index}
							label={item}
							checked={item === checked}
							onChange={() => handleChange(item)}
							disabled={item === 'checkbox4'}
							size={item === 'checkbox5' ? 'small' : 'medium'}
						/>
					))}
				</AppFormGroup>
			</AppFormControl>
		</AppBox>
	)
}
