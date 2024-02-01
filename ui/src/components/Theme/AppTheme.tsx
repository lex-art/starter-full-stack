import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ReactNode } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'

interface AppThemeProps {
	children: ReactNode
}

const AppThemeMUI = ({ children }: AppThemeProps) => {
	return (
		<AppRouterCacheProvider>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</AppRouterCacheProvider>
	)
}

export { AppThemeMUI }
