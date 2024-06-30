import { Table, TableProps, ThemeOptions } from '@mui/material'
import { FC } from 'react'

const AppTableTheme: ThemeOptions = {
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

const AppTable: FC<TableProps> = ({ children, ...props }) => {
	return <Table {...props}>{children}</Table>
}

export { AppTable, AppTableTheme }

AppTable.displayName = 'AppTable'
export default AppTable
