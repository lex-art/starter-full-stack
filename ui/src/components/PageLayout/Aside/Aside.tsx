import React from 'react'
import styles from '../styles.module.css'
import asideStyles from './aside.module.css'
import { AppGrid } from '@/components/Common/Grid/Grid'
import { MENU_ROUTES } from './menuRoutes'
import { IMenuRoute } from '@/lib/types/MenuRoute'
import MenuItem from './MenuItem'

export default function Aside() {
	return (
		<aside className={styles.aside}>
			<AppGrid container height="100%" width="100%" display="grid" gridTemplateRows="7rem 1fr">
				<AppGrid item width="100%" height="100%">
					<span
						style={{
							width: '100%',
							height: '7rem',
							background: '#262626',
							color: 'white',
							display: 'grid',
							placeItems: 'center',
							fontSize: '1.6rem'
						}}
					>
						logo
					</span>
				</AppGrid>
				<AppGrid item width="100%" height="100%" className={asideStyles.container}>
					<ul>
						{MENU_ROUTES.filter((route: IMenuRoute) => {
							//TODO: Apply filter route depending role user
							return route
						}).map((route: IMenuRoute, index: number) =>
							route.subMenu ? (
								<MenuItem
									key={route.text}
									link={route.link}
									text={route.text}
									icon={route.icon}
									index={index}
								>
									{route.subMenu
										.filter((route: IMenuRoute) => {
											//TODO: Apply filter route depending role user
											return route
										})
										.map((subRoute: IMenuRoute) => (
											<MenuItem
												key={subRoute.text}
												link={subRoute.link}
												text={subRoute.text}
												index={index}
												isSubItem
											/>
										))}
								</MenuItem>
							) : (
								<MenuItem key={route.text} link={route.link} icon={route.icon} text={route.text} />
							)
						)}
					</ul>
				</AppGrid>
			</AppGrid>
		</aside>
	)
}
