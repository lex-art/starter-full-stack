import AppBox from '@/components/Common/Layout/Box'
import { ReactNode } from 'react'
import AppBreadcrumb from '../../Breadcrumb/BreadCrumb'
import { Footer } from './Footer'
import { Header } from './Header'

type Props = {
	readonly children?: ReactNode
}

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
			<AppBox
				gridArea="main"
				component="main"
				sx={{
					flexGrow: 1,
					p: 2,
					pt: 8,
					pb: 8,
					backgroundColor: 'background.default'
				}}
			>
				<AppBreadcrumb />
				{children}
			</AppBox>
			<Footer />
		</AppBox>
	)
}
