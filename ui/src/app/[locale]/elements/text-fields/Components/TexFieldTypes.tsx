'use client'
import React, { ChangeEvent } from 'react'
import AppPaper from '@/components/Common/LAyout/Paper'
import { AppNumericField } from '@/components/Common/Inputs/NumericField/NumericField'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppTelInput from '@/components/Common/Inputs/TelInput/TelInput'
import { NumberFormatValues, OnValueChange } from 'react-number-format'
import AppBox from '@/components/Common/LAyout/Box'

export default function TextFieldTypes() {
	const [valueNumeric, setValueNumeric] = React.useState<number>()

	const handleChangeNumeric = (value: NumberFormatValues): void => {
		setValueNumeric(value.floatValue)
	}

	return (
		<AppPaper
			elevation={5}
			sx={{
				padding: 2
			}}
		>
			<AppTypography variant="body1" fontWeight="bold">
				Input Numeric
			</AppTypography>
			<br />
			<AppBox gap={2} display="flex" flexWrap="wrap">
				<AppNumericField
					fullWidth={false}
					label="Numeric Field"
					value={valueNumeric}
					onChange={handleChangeNumeric}
					decimalScale={2}
					allowNegative={false}
					thousandSeparator=","
					currency="USD"
				/>
				<AppNumericField
					variant="filled"
					label="Numeric Field small"
					fullWidth={false}
					value={valueNumeric}
					onChange={handleChangeNumeric}
					decimalScale={2}
					allowNegative={false}
					thousandSeparator=","
					currency="USD"
				/>
				<AppNumericField
					fullWidth={false}
					label="Numeric Field"
					value={valueNumeric}
					onChange={handleChangeNumeric}
					decimalScale={2}
					allowNegative={false}
					thousandSeparator=","
					currency="USD"
					error
					helperText="This is an error"
				/>
				<AppNumericField
					fullWidth={false}
					label="Numeric Field"
					value={valueNumeric}
					onChange={handleChangeNumeric}
					decimalScale={2}
					allowNegative={false}
					thousandSeparator=","
					currency="USD"
					disabled
					size="small"
				/>
			</AppBox>
			<AppTypography variant="body1" fontWeight="bold">
				Input Phone
			</AppTypography>
			<br />
			<AppBox gap={2} display="flex" flexWrap="wrap">
				<AppTelInput fullWidth={false} defaultCountryCode="US" value="" onChange={() => {}} label="Phone" />
				<AppTelInput
					fullWidth={false}
					defaultCountryCode="MX"
					value=""
					onChange={() => {}}
					label="Phone"
					variant="filled"
				/>
				<AppTelInput
					fullWidth={false}
					variant="standard"
					size="small"
					defaultCountryCode="CL"
					value=""
					onChange={() => {}}
					label="Phone"
					disabled
				/>
				<AppTelInput fullWidth={false} defaultCountryCode="GT" value="" onChange={() => {}} label="Phone" />
				<AppTelInput
					fullWidth={false}
					defaultCountryCode="ES"
					value=""
					onChange={() => {}}
					label="Phone"
					error
					helperText="This is an error"
				/>
			</AppBox>
		</AppPaper>
	)
}
