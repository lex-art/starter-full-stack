import FormControl from '@mui/material/FormControl'
import { FC } from 'react'
import { AppFormControlProps } from './theme'

/**
 * @description A wrapper for form control elements like input, select, and textarea, etc.
 * @param AppFormControlProps
 * @returns  A wrapper for the FormControl component
 */
const AppFormControl: FC<AppFormControlProps> = ({
	children,
	...props
}) => {
	const { align, gridAreaTemplateColumns, ...rest } = props
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
