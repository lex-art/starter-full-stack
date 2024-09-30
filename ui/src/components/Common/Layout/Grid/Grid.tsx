import { Grid2, Grid2Props } from '@mui/material'
import { ThemeOptions } from '@mui/material/styles'
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react'

declare module '@mui/material/styles' {
	interface BreakpointOverrides {
		xxl: true
	}
}

export const TBGridThemeOptions: ThemeOptions = {
	breakpoints: {
		keys: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
		values: {
			xs: 0,
			sm: 600,
			md: 960,
			lg: 1280,
			xl: 1920,
			xxl: 2240
		}
	}
}

export const AppGrid: ForwardRefExoticComponent<Omit<Grid2Props, 'ref'> & RefAttributes<HTMLDivElement>> =
	forwardRef<HTMLDivElement, Grid2Props>(({ children, ...rest }, ref) => {
		return (
			<Grid2 ref={ref} {...rest}>
				{children}
			</Grid2>
		)
	})

AppGrid.displayName = 'AppGrid'
export default AppGrid
