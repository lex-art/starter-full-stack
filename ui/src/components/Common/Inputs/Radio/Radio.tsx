import { font } from '@/lib/designTokens'
import { Radio, RadioProps, ThemeOptions } from '@mui/material'
import { forwardRef } from 'react'
import AppFormControlLabel from '../../FormControl/FormControlLabel'

type AppRadioProps = RadioProps & {
	label: string
}

const AppRadioTheme: ThemeOptions = {
	components: {
		MuiRadio: {
			defaultProps: {
				color: 'primary'
			},
			styleOverrides: {
				root: {
					'& .MuiSvgIcon-root': { fontSize: font.sizes.fontSizeLarge }
				}
			}
		}
	}
}
const AppRadio = forwardRef<HTMLDivElement, AppRadioProps>((props, ref) => {
	const { label, ...rest } = props
	return <AppFormControlLabel ref={ref} label={label} control={<Radio {...rest} />} />
})

AppRadio.displayName = 'AppRadio'
export { AppRadio, AppRadioTheme }
export default AppRadio
