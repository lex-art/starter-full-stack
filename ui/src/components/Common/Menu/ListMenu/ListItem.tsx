import { ListItem, ListItemProps } from '@mui/material'
import { FC } from 'react'

const AppListItem: FC<ListItemProps> = ({ children, ...props }) => {
	return <ListItem {...props}>{children}</ListItem>
}

export default AppListItem
