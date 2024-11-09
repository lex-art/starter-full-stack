import { TableHead, TableHeadProps } from '@mui/material'
import { FC } from 'react'

const AppTableHead: FC<TableHeadProps> = ({ children, ...props }) => {
	return <TableHead {...props}>{children}</TableHead>
}

AppTableHead.displayName = 'AppTableHead'
export default AppTableHead
