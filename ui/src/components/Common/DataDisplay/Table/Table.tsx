import { Table, TableProps } from '@mui/material'
import { FC } from 'react'

const AppTable: FC<TableProps> = ({ children, ...props }) => {
	return <Table {...props}>{children}</Table>
}

export { AppTable }

AppTable.displayName = 'AppTable'
export default AppTable
