import { ThemeOptions } from '@mui/material'

declare module '@mui/material/styles' {
	interface BreakpointOverrides {
		xxl: true
	}
}

export const AppGridTheme: ThemeOptions = {
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
