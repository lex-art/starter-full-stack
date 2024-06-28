import { Checkbox, CheckboxProps, ThemeOptions } from '@mui/material'
import { forwardRef } from 'react'
import { font } from '@/lib/design-tokens'
import AppFormControlLabel from '../FormControl/FormControlLabel'

type AppCheckBoxProps = CheckboxProps & {
	label: string
}

const AppCheckboxTheme: ThemeOptions = {
	components: {
		MuiCheckbox: {
			defaultProps: {
				color: 'primary'
			},
			styleOverrides: {
				root: {
					'& .MuiSvgIcon-root': { fontSize: font.sizes.fontSizeLarge }
				},
				sizeMedium: {
					fontSize: '1.5rem'
				}
			}
		}
	}
}
const AppCheckbox = forwardRef<HTMLDivElement, AppCheckBoxProps>((props, ref) => {
	const { label, ...rest } = props
	return <AppFormControlLabel ref={ref} label={label} control={<Checkbox {...rest} />} />
})

AppCheckbox.displayName = 'AppCheckbox'
export { AppCheckbox, AppCheckboxTheme }
export default AppCheckbox
