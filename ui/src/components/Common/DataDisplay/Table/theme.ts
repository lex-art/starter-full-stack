import { ThemeOptions } from "@mui/material"

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
export { AppTableCellTheme }