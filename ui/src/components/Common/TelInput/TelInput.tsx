import { FC } from 'react'
import { MAX_LENGTH_NUMBER_PHONE } from '@/lib/utilities/constants/maxLengthNumbePhone'
import { MuiTelInput, MuiTelInputCountry, MuiTelInputProps } from 'mui-tel-input'

interface AppTelInputProps {
	defaultCountryCode: MuiTelInputCountry
}

export const AppTelInput: FC<MuiTelInputProps & AppTelInputProps> = (props) => {
	const { defaultCountryCode, ...rest } = props
	return (
		<MuiTelInput
			minRows={1}
			inputProps={{
				maxLength: MAX_LENGTH_NUMBER_PHONE[defaultCountryCode]
			}}
			defaultCountry={defaultCountryCode}
			{...rest}
		/>
	)
}

AppTelInput.displayName = 'AppTelInput'
export default AppTelInput
