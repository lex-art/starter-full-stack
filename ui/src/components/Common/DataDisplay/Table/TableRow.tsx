import { TableRow, TableRowProps } from '@mui/material'
import { FC } from 'react'

const AppTableRow: FC<TableRowProps> = ({ children, ...props }) => {
	return <TableRow {...props}>{children}</TableRow>
}

AppTableRow.displayName = 'AppTableRow'
export default AppTableRow
