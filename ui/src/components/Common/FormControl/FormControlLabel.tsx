import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import { FC } from 'react'


const AppFormControlLabel: FC<FormControlLabelProps> = (props) => {
	return <FormControlLabel {...props} />
}

AppFormControlLabel.displayName = 'AppFormControlLabel'
export default AppFormControlLabel
