import { ReactNode } from 'react'
import AsideHeaderClient from './AsideHeaderClient'
import AppBreadcrumb from '../../Breadcrumb/BreadCrumb'
import AppBox from '@/components/Common/Layout/Box'

type Props = {
	readonly children?: ReactNode
	readonly isOpenDrawer: boolean
}
const drawerWidth = 25

export default function PageLayout({ children, isOpenDrawer }: Props) {
	return (
		<AppBox sx={{ display: 'flex', height: '100%', minHeight: '100vh' }}>
			<AsideHeaderClient drawerWidth={drawerWidth} isOpenDrawer={isOpenDrawer} />
			<AppBox
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
			</AppBox>
		</AppBox>
	)
}
