import { font } from '@/lib/design-tokens'
import { ListItemIcon, ListItemIconProps, ThemeOptions } from '@mui/material'
import { FC } from 'react'

const AppListItemIconTheme: ThemeOptions = {
	components: {
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					minWidth: 'auto'
				}
			}
		}
	}
}

const AppListItemIcon: FC<ListItemIconProps> = ({ children, ...props }) => {
	return <ListItemIcon {...props}>{children}</ListItemIcon>
}

export { AppListItemIcon, AppListItemIconTheme }
export default AppListItemIcon
