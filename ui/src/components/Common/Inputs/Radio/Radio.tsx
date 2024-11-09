import { font } from '@/lib/designTokens'
import { Radio, RadioProps, ThemeOptions } from '@mui/material'
import { forwardRef } from 'react'
import AppFormControlLabel from '../../FormControl/FormControlLabel'

type AppRadioProps = RadioProps & {
	label: string
}

const AppRadio = forwardRef<HTMLDivElement, AppRadioProps>((props, ref) => {
	const { label, ...rest } = props
	return <AppFormControlLabel ref={ref} label={label} control={<Radio {...rest} />} />
})

AppRadio.displayName = 'AppRadio'
export default AppRadio
