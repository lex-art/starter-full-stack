import { font } from '@/lib/designTokens'
import { MAX_LENGTH_NUMBER_PHONE } from '@/lib/utilities/constants/maxLengthNumbePhone'
import {
	MuiTelInput,
	MuiTelInputCountry,
	MuiTelInputProps
} from 'mui-tel-input'
import { forwardRef } from 'react'

interface AppTelInputProps {
	defaultCountryCode: MuiTelInputCountry
}

const AppTelInput = forwardRef<
	HTMLDivElement,
	MuiTelInputProps & AppTelInputProps
>((props, ref) => {
	const { defaultCountryCode, forceCallingCode, ...rest } =
		props
	return (
		<MuiTelInput
			ref={ref}
			minRows={1}
			sx={{
				'& .MuiFormLabel-root': {
					fontSize: font.sizes.fontSizeLarge,
					marginTop: '0.8rem',
					'&.MuiInputLabel-outlined': {
						'&.Mui-focused, &.MuiFormLabel-filled': {
							transform: 'translate(14px, -9px) scale(0.75)'
						}
					}
				}
			}}
			forceCallingCode
			inputProps={{
				maxLength:
					MAX_LENGTH_NUMBER_PHONE[defaultCountryCode]
			}}
			defaultCountry={defaultCountryCode}
			{...rest}
		/>
	)
})

AppTelInput.displayName = 'AppTelInput'
export default AppTelInput
