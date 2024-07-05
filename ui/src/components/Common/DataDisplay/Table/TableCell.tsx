import { TableCell, TableCellProps, ThemeOptions } from '@mui/material'
import { FC } from 'react'

const AppTableCellTheme: ThemeOptions = {
	components: {
		MuiTableCell: {
			styleOverrides: {
				root: {
					padding: '1rem'
				}
			}
		}
	}
}

const AppTableCell: FC<TableCellProps> = ({ children, ...props }) => {
	return <TableCell {...props}>{children}</TableCell>
}

export { AppTableCell, AppTableCellTheme }
AppTableCell.displayName = 'AppTableCell'
export default AppTableCell
