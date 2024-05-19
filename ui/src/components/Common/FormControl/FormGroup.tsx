import { font } from '@/lib/design-tokens'
import { ThemeOptions, useMediaQuery } from '@mui/material'
import FormControl, { FormControlProps } from '@mui/material/FormControl'
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import FormGroup, { FormGroupProps } from '@mui/material/FormGroup'
import FormHelperText, { FormHelperTextProps } from '@mui/material/FormHelperText'
import FormLabel, { FormLabelProps } from '@mui/material/FormLabel'
import InputLabel, { InputLabelProps } from '@mui/material/InputLabel'
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
	const isMobile: boolean = useMediaQuery('(min-width:768px)')
	return (
		<FormGroup
			sx={{
				display: 'grid',
				gridTemplateColumns: !isMobile
					? 'auto'
					: gridAreaTemplateColumns ?? 'repeat(auto-fit, minmax(49%, 1fr))',
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
