import FormLabel, { FormLabelProps } from '@mui/material/FormLabel'
import { FC } from 'react'

const AppFormLabel: FC<FormLabelProps> = ({ children, ...props }) => {
	return <FormLabel {...props}>{children}</FormLabel>
}

AppFormLabel.displayName = 'AppFormLabel'
export default AppFormLabel
