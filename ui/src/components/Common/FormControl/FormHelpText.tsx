import FormHelperText, { FormHelperTextProps } from '@mui/material/FormHelperText'
import { FC } from 'react'

const AppFormHelperText: FC<FormHelperTextProps> = (props) => {
	return <FormHelperText {...props} />
}

AppFormHelperText.displayName = 'AppFormHelperText'
export default AppFormHelperText
