import { ReactNode } from 'react'
import LocaleSwitcher from '../LocaleSwitcher/LocaleSwitcher'
import { AppGrid } from '../Common/Grid/Grid'
import styles from './styles.module.css'
import Aside from './Aside/Aside'
import Header from './header/Header'

type Props = {
	children?: ReactNode
}

export default function PageLayout({ children }: Props) {
	/* return (
		<div
			style={{
				padding: 24,
				fontFamily: 'system-ui, sans-serif',
				lineHeight: 1.5,
				boxSizing: 'border-box'
			}}
		>
			<nav>
				<h1>Navar</h1>
			</nav>
			<div style={{ maxWidth: 510 }}>
				<h1>{title}</h1>
				{children}
				<div style={{ marginTop: 24 }}>
					<LocaleSwitcher />
				</div>
			</div>
		</div>
	) */
	return (
		<AppGrid
			container
			minHeight="100vh"
			height="100%"
			position="relative"
			zIndex={0}
			display="grid"
			className={styles.AppGrid}
		>
			<Aside />
			<Header />

			<main className={styles.main}>
				<AppGrid item width="100%" height="100%" className={styles.mainContainer}>
					{children}
				</AppGrid>
			</main>
		</AppGrid>
	)
}
