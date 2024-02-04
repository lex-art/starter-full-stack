import { ReactNode } from 'react'
import { Box } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import AsideHeaderClient from './AsideHeaderClient'

type Props = {
	children?: ReactNode
}
const drawerWidth = 25

export default function PageLayout({ children }: Props) {
	return (
		<Box sx={{ display: 'flex', height: '100%', minHeight: '100vh' }}>
			<CssBaseline />
			<AsideHeaderClient drawerWidth={drawerWidth} />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 2,
					pt: 10,
					width: { sm: `calc(100% - ${drawerWidth}rem)` },
					backgroundColor: '#f0f0f0'
				}}
			>
				{children}
			</Box>
		</Box>
	)
}
