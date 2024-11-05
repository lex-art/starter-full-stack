import FormLabel, { FormLabelProps } from '@mui/material/FormLabel'
import { FC } from 'react'

/**
 * @description General label for all form elements
 * @param FormLabelProps
 * @returns A wrapper for the FormLabel component
 */
const AppFormLabel: FC<FormLabelProps> = ({ children, ...props }) => {
	return <FormLabel {...props}>{children}</FormLabel>
}

AppFormLabel.displayName = 'AppFormLabel'
export default AppFormLabel
