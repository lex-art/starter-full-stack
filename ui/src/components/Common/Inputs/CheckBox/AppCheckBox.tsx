import { font } from '@/lib/designTokens'
import { Checkbox, CheckboxProps, ThemeOptions } from '@mui/material'
import { forwardRef } from 'react'
import AppFormControlLabel from '../../FormControl/FormControlLabel'

type AppCheckBoxProps = CheckboxProps & {
	label: string
}

const AppCheckbox = forwardRef<HTMLDivElement, AppCheckBoxProps>((props, ref) => {
	const { label, ...rest } = props
	return <AppFormControlLabel ref={ref} label={label} control={<Checkbox {...rest} />} />
})

AppCheckbox.displayName = 'AppCheckbox'
export default AppCheckbox
