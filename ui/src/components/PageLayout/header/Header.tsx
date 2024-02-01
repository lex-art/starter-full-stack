import React from 'react'
import styles from '../styles.module.css'
import headerStyles from './header.module.css'
import { AppGrid } from '@/components/Common/Grid/Grid'

export default function Header() {
	return (
		<header className={styles.header}>
			<AppGrid container className={headerStyles.container}>
				<AppGrid item display="flex" gap="1rem"></AppGrid>
				<AppGrid item display="flex" gap="1rem">
					<span
						style={{
							padding: '2.5rem',
							background: '#262626',
							borderRadius: '50%'
						}}
					></span>
					<span
						style={{
							padding: '2.5rem',
							background: '#262626',
							borderRadius: '50%'
						}}
					></span>
				</AppGrid>
			</AppGrid>
		</header>
	)
}
