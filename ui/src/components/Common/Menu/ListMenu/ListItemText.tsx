import { ListItemText, ListItemTextProps } from '@mui/material'
import { FC } from 'react'

const AppListItemText: FC<ListItemTextProps> = ({ children, ...props }) => {
	return <ListItemText {...props}>{children}</ListItemText>
}
export default AppListItemText
