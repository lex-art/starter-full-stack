import { Grid2, Grid2Props } from '@mui/material'
import { ThemeOptions } from '@mui/material/styles'
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react'

const AppGrid: ForwardRefExoticComponent<Omit<Grid2Props, 'ref'> & RefAttributes<HTMLDivElement>> =
	forwardRef<HTMLDivElement, Grid2Props>(({ children, ...rest }, ref) => {
		return (
			<Grid2 ref={ref} {...rest}>
				{children}
			</Grid2>
		)
	})

AppGrid.displayName = 'AppGrid'
export default AppGrid
