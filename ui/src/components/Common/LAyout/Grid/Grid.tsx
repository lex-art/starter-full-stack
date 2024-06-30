import Grid, { GridProps } from '@mui/material/Grid'
import { ThemeOptions } from '@mui/material/styles'
import { FC, forwardRef } from 'react'

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

export const AppGrid: FC<GridProps> = forwardRef<HTMLDivElement, GridProps>(({ children, ...rest }, ref) => {
	return (
		<Grid ref={ref} {...rest}>
			{children}
		</Grid>
	)
})

AppGrid.displayName = 'AppGrid'
export default AppGrid
