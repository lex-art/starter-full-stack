import { Box } from '@mui/material'
import { FC } from 'react'
interface AppFormContainerProps {
	gridAreaTemplateColumns?: string
	columnGap?: string
	rowGap?: string
	children: React.ReactNode
}

/**
 * @description A wrapper for the FormGroup component
 * @returns A wrapper for the FormGroup component
 */
const AppFormContainer: FC<AppFormContainerProps> = ({
	children,
	gridAreaTemplateColumns,
	columnGap,
	rowGap
}) => {
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns:
					gridAreaTemplateColumns ??
					'repeat(auto-fit, minmax(49%, 1fr))',
				columnGap: columnGap ?? '1rem',
				rowGap: rowGap ?? '0.5rem'
			}}
		>
			{children}
		</Box>
	)
}

export default AppFormContainer
