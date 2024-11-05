import InputLabel, { InputLabelProps } from '@mui/material/InputLabel'
import { FC } from 'react'

/**
 * @description An additional label for the specific input element
 * @param InputLabelProps
 * @returns A wrapper for the InputLabel component
 */
const AppInputLabel: FC<InputLabelProps> = ({ children, ...props }) => {
	return <InputLabel {...props}>{children}</InputLabel>
}

AppInputLabel.displayName = 'AppInputLabel'
export default AppInputLabel
