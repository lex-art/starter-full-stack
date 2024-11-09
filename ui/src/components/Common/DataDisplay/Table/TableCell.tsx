import { TableCell, TableCellProps, ThemeOptions } from '@mui/material'
import { FC } from 'react'

const AppTableCell: FC<TableCellProps> = ({ children, ...props }) => {
	return <TableCell {...props}>{children}</TableCell>
}

AppTableCell.displayName = 'AppTableCell'
export default AppTableCell
