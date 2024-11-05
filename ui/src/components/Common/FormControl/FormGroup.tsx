import FormGroup, { FormGroupProps } from '@mui/material/FormGroup'
import { FC } from 'react'
import { AppFormGroupProps } from './theme'
/**
 * @description A wrapper variety elements with checkboxes or switches
 * @param FormGroupProps & AppFormGroupProps> 
 * @returns A wrapper for the FormGroup component
 */
const AppFormGroup: FC<FormGroupProps & AppFormGroupProps> = ({
	children,
	gridAreaTemplateColumns,
	columnGap,
	rowGap,
	...props
}) => {
	//const isMobile: boolean = useMediaQuery('(min-width:768px)')
	return (
		<FormGroup
			sx={{
				gridTemplateColumns:
					gridAreaTemplateColumns ?? 'repeat(auto-fit, minmax(49%, 1fr))'
			}}
			{...props}
		>
			{children}
		</FormGroup>
	)
}

AppFormGroup.displayName = 'AppFormGroup'
export default AppFormGroup
