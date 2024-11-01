import FormControl from '@mui/material/FormControl'
import { FC } from 'react'
import { AppFormControlProps } from './theme'

const AppFormControl: FC<AppFormControlProps> = ({ children, ...props }) => {
	const { align, ...rest } = props
	return (
		<FormControl
			sx={{
				alignItems: align
			}}
			{...rest}
		>
			{children}
		</FormControl>
	)
}

AppFormControl.displayName = 'AppFormControl'
export default AppFormControl
