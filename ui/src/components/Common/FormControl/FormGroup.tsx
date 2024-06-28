import FormGroup, { FormGroupProps } from '@mui/material/FormGroup'
import { FC } from 'react'

interface AppFormGroupProps {
	gridAreaTemplateColumns?: string
	columnGap?: string
	rowGap?: string
}
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
				display: 'grid',
				gridTemplateColumns: gridAreaTemplateColumns ?? 'repeat(auto-fit, minmax(49%, 1fr))',
				columnGap: columnGap ?? '1rem',
				rowGap: rowGap ?? '0.5rem'
			}}
			{...props}
		>
			{children}
		</FormGroup>
	)
}

export { AppFormGroup }
AppFormGroup.displayName = 'AppFormGroup'
export default AppFormGroup
