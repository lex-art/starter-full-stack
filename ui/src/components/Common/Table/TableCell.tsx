import { TableCell, TableCellProps } from '@mui/material'
import { FC } from 'react'

const AppTableCell: FC<TableCellProps> = ({ children, ...props }) => {
	return <TableCell {...props}>{children}</TableCell>
}

export { AppTableCell }
AppTableCell.displayName = 'AppTableCell'
export default AppTableCell
