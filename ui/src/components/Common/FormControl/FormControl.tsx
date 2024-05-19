import FormControl, { FormControlProps } from '@mui/material/FormControl'
import { FC } from 'react'

interface AppFormControlProps extends FormControlProps {
	align?: 'start' | 'end'
}

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

export { AppFormControl }
AppFormControl.displayName = 'AppFormControl'
export default AppFormControl
