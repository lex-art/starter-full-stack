import { font } from '@/lib/design-tokens'
import { Switch, SwitchProps, ThemeOptions } from '@mui/material'
import { forwardRef } from 'react'
import AppFormControlLabel from '../../FormControl/FormControlLabel'

type AppSwitchProps = SwitchProps & {
	label?: string
	CustomSwitch?: JSX.ElementType
}

const AppSwitchTheme: ThemeOptions = {
	components: {
		MuiSwitch: {
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
const AppSwitch = forwardRef<HTMLDivElement, AppSwitchProps>((props, ref) => {
	const { label, CustomSwitch, ...rest } = props
	const controlProps = { ...rest } as SwitchProps
	return (
		<AppFormControlLabel
			ref={ref}
			label={label}
			control={CustomSwitch ? <CustomSwitch {...controlProps} /> : <Switch {...controlProps} />}
		/>
	)
})

AppSwitch.displayName = 'AppSwitch'
export { AppSwitch, AppSwitchTheme }
export default AppSwitch
