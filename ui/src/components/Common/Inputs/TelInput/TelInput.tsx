import { FC, forwardRef } from 'react'
import { MAX_LENGTH_NUMBER_PHONE } from '@/lib/utilities/constants/maxLengthNumbePhone'
import { MuiTelInput, MuiTelInputCountry, MuiTelInputProps } from 'mui-tel-input'

interface AppTelInputProps {
	defaultCountryCode: MuiTelInputCountry
}

const AppTelInput: FC<MuiTelInputProps & AppTelInputProps> = forwardRef<
	HTMLDivElement,
	MuiTelInputProps & AppTelInputProps
>((props, ref) => {
	const { defaultCountryCode, forceCallingCode, ...rest } = props
	return (
		<MuiTelInput
			ref={ref}
			minRows={1}
			forceCallingCode
			inputProps={{
				maxLength: MAX_LENGTH_NUMBER_PHONE[defaultCountryCode]
			}}
			defaultCountry={defaultCountryCode}
			{...rest}
		/>
	)
})

AppTelInput.displayName = 'AppTelInput'
export { AppTelInput }
export default AppTelInput
