import { ThemeOptions } from '@mui/material'
import FormGroup, { FormGroupProps } from '@mui/material/FormGroup'
import { FC } from 'react'

interface AppFormGroupProps {
	gridAreaTemplateColumns?: string
	columnGap?: string
	rowGap?: string
}

const AppFormGroupThem: ThemeOptions = {
	components: {
		MuiFormGroup: {
			styleOverrides: {
				root: {
					display: 'grid',
					alignItems: 'center',
					//gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
					columnGap: '1rem',
					rowGap: '0.5rem'
				}
			}
		}
	}
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
				gridTemplateColumns: gridAreaTemplateColumns ?? 'repeat(auto-fit, minmax(49%, 1fr))'
			}}
			{...props}
		>
			{children}
		</FormGroup>
	)
}

export { AppFormGroup, AppFormGroupThem }
AppFormGroup.displayName = 'AppFormGroup'
export default AppFormGroup
