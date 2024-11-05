import FormHelperText, { FormHelperTextProps } from '@mui/material/FormHelperText'
import { FC } from 'react'

/**
 * @description A helper text for form elements and gives context about the input field
 * @param FormHelperTextProps
 * @returns A wrapper for the FormHelperText component
 */
const AppFormHelperText: FC<FormHelperTextProps> = (props) => {
	return <FormHelperText {...props} />
}

AppFormHelperText.displayName = 'AppFormHelperText'
export default AppFormHelperText
