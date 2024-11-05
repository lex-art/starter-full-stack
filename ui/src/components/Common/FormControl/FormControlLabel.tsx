import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import { FC } from 'react'


/**
 * @description Associate a label with a control element form example checkbox or radio: 
 * <FormControlLabel control={<Checkbox />} label="Aceptar términos y condiciones" />
 * @param FormControlLabelProps
 * @returns A wrapper for the FormControlLabel component
 */
const AppFormControlLabel: FC<FormControlLabelProps> = (props) => {
	return <FormControlLabel {...props} />
}

AppFormControlLabel.displayName = 'AppFormControlLabel'
export default AppFormControlLabel
