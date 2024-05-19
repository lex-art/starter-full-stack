import InputLabel, { InputLabelProps } from '@mui/material/InputLabel'
import { FC } from 'react'

const AppInputLabel: FC<InputLabelProps> = ({ children, ...props }) => {
	return <InputLabel {...props}>{children}</InputLabel>
}

export { AppInputLabel }
AppInputLabel.displayName = 'AppInputLabel'
export default AppInputLabel
