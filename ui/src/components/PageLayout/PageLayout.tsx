import { ReactNode } from 'react'
import LocaleSwitcher from './LocaleSwitcher'

type Props = {
	children?: ReactNode
	title: string
}

export default function PageLayout({ children, title }: Props) {
	return (
		<>
			<div
				style={{
					padding: 24,
					fontFamily: 'system-ui, sans-serif',
					lineHeight: 1.5,
					boxSizing: 'border-box'
				}}
			>
                <nav><h1>Navar</h1></nav>
				<div style={{ maxWidth: 510 }}>
					<h1>{title}</h1>
					{children}
					<div style={{ marginTop: 24 }}>
						<LocaleSwitcher />
					</div>
				</div>
			</div>
		</>
	)
}
