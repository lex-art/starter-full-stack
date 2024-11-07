import { Box, BoxProps } from '@mui/material'
import { FC } from 'react'
interface AppFormContainerProps {
	gridAreaTemplateColumns?: string
	columnGap?: string
	rowGap?: string
	children: React.ReactNode
	sx?: BoxProps['sx']
}

/**
 * @description A wrapper for the FormGroup component
 * @returns A wrapper for the FormGroup component
 */
const AppFormContainer: FC<AppFormContainerProps> = ({
	children,
	gridAreaTemplateColumns,
	columnGap,
	rowGap,
	sx
}) => {
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns:
					gridAreaTemplateColumns ??
					'repeat(auto-fit, minmax(49%, 1fr))',
				columnGap: columnGap ?? '1rem',
				rowGap: rowGap ?? '0.5rem',
				...sx
			}}
		>
			{children}
		</Box>
	)
}

export default AppFormContainer
