import { ListItemButton, ListItemButtonProps } from '@mui/material'
import { FC } from 'react'

const AppListItemButton: FC<ListItemButtonProps> = ({ children, ...props }) => {
	return <ListItemButton {...props}>{children}</ListItemButton>
}

export default AppListItemButton
