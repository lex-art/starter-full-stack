import { FC } from 'react'
import { ListItem, ListItemProps } from '@mui/material'

const AppListItem: FC<ListItemProps> = ({ children, ...props }) => {
	return <ListItem {...props}>{children}</ListItem>
}

export default AppListItem
