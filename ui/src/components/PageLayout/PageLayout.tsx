import { ReactNode } from 'react'
import { Box } from '@mui/material'
import AsideHeaderClient from './AsideHeaderClient'
import AppBreadcrumb from '../Breadcrumb/BreadCrumb'

type Props = {
	readonly children?: ReactNode
}
const drawerWidth = 25

export default function PageLayout({ children }: Props) {
	return (
		<Box sx={{ display: 'flex', height: '100%', minHeight: '100vh' }}>
			<AsideHeaderClient drawerWidth={drawerWidth} />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 2,
					pt: 10,
					width: { sm: `calc(100% - ${drawerWidth}rem)` },
					backgroundColor: 'background.default'
				}}
			>
				<AppBreadcrumb />
				{children}
			</Box>
		</Box>
	)
}
