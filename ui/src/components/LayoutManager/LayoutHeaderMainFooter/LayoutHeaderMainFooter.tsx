import { ReactNode } from 'react'
import AppBreadcrumb from '../../Breadcrumb/BreadCrumb'
import AppBox from '@/components/Common/Layout/Box'
import { Header } from './Header'
import { Footer } from './Footer'

type Props = {
	readonly children?: ReactNode
}
const drawerWidth = 25

export default function LayoutHeaderMainFooter({ children }: Props) {
	return (
		<AppBox
			component="section"
			display="grid"
			height="100%"
			width="100%"
			minHeight="100vh"
			gap={1}
			gridTemplateColumns="1fr"
			gridTemplateRows="auto 1fr auto"
			gridTemplateAreas={`
				"header"
				"main"
				"footer"
			`}
		>
			<Header />
			<AppBox gridArea="main" component="main" pl={10} pr={10}>
				<AppBreadcrumb />
				{children}
			</AppBox>
			<Footer />
		</AppBox>
	)
}
