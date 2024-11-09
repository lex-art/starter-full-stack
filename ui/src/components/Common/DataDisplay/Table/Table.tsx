import { Table, TableProps } from '@mui/material'
import { FC } from 'react'

const AppTable: FC<TableProps> = ({ children, ...props }) => {
	return <Table {...props}>{children}</Table>
}

AppTable.displayName = 'AppTable'
export default AppTable
