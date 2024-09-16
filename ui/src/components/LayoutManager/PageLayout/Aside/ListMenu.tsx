import { List, ListSubheader } from '@mui/material'
import MenuItem from './MenuItem'
import { MENU_ROUTES } from './menuRoutes'

interface ListItemProps {
	drawerWidth: number
	handleDrawerClose?(): void
	open: boolean
}
export default function ListMenu({ drawerWidth, open, handleDrawerClose }: ListItemProps) {
	return (
		<List
			sx={{ width: '100%', maxWidth: `${drawerWidth}rem` }}
			component="nav"
			aria-labelledby="nested-list-subheader"
			subheader={
				<ListSubheader component="div" id="nested-list-subheader">
					{open ? 'Nested List Items' : 'Menu'}
				</ListSubheader>
			}
		>
			{MENU_ROUTES.filter((route) => {
				//TODO: Add validation for roles
				return route
			}).map((route, index) => (
				<MenuItem
					key={route.text + index}
					index={index}
					text={route.text}
					icon={route.icon}
					link={route.link}
					submenu={route.subMenu}
					openAside={open}
					handleDrawerClose={handleDrawerClose}
					section={route.section}
					defaultOpen={route.defaultOpen}
				/>
			))}
		</List>
	)
}
