import { font } from '@/lib/designTokens'
import { Switch, SwitchProps, ThemeOptions } from '@mui/material'
import { forwardRef } from 'react'
import AppFormControlLabel from '../../FormControl/FormControlLabel'

type AppSwitchProps = SwitchProps & {
	label?: string
	CustomSwitch?: JSX.ElementType
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
export default AppSwitch
