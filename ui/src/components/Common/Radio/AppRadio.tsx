import { Checkbox, CheckboxProps, Radio, ThemeOptions } from '@mui/material'
import { forwardRef } from 'react'
import { font } from '@/lib/design-tokens'
import AppFormControlLabel from '../FormControl/FormControlLabel'

type AppCheckBoxProps = CheckboxProps & {
	label: string
}

const AppRadioTheme: ThemeOptions = {
	components: {
		MuiRadio: {
			defaultProps: {
				color: 'secondary'
			},
			styleOverrides: {
				root: {
					'& .MuiSvgIcon-root': { fontSize: font.sizes.fontSizeLarge }
				}
			}
		}
	}
}
const AppRadio = forwardRef<HTMLDivElement, AppCheckBoxProps>((props, ref) => {
	const { label, ...rest } = props
	return <AppFormControlLabel ref={ref} label={label} control={<Radio {...rest} />} />
})

AppRadio.displayName = 'AppRadio'
export { AppRadio, AppRadioTheme }
export default AppRadio
