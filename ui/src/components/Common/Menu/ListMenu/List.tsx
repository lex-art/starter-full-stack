import { List, ListProps } from '@mui/material'
import { FC } from 'react'

const AppList: FC<ListProps> = ({ children, ...props }) => {
	return <List {...props}> {children} </List>
}

export default AppList
