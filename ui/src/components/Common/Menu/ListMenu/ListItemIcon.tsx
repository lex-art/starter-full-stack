import { ListItemIcon, ListItemIconProps, ThemeOptions } from '@mui/material'
import { FC } from 'react'

const AppListItemIcon: FC<ListItemIconProps> = ({ children, ...props }) => {
	return <ListItemIcon {...props}>{children}</ListItemIcon>
}
export default AppListItemIcon
