import { font } from '@/lib/designTokens'
import { ThemeOptions } from '@mui/material'

export interface AppTablePaginationProps {
	limit?: number
	total?: number
	page?: number
	setPage?(newPage: number): void
	setRowsPerPage?(rowsPerPage: number): void
	rowsPerPageOptions?: number[]
}

const AppTablePaginationTheme: ThemeOptions = {
	components: {
		MuiTablePagination: {
			styleOverrides: {
				root: {
					fontSize: font.sizes.fontSizeMedium
				},
				toolbar: {
					fontSize: font.sizes.fontSizeMedium
				},
				displayedRows: {
					fontSize: font.sizes.fontSizeMedium
				},
				input: {
					fontSize: font.sizes.fontSizeMedium,
					paddingRight: '0.3rem'
				},
				selectLabel: {
					fontSize: font.sizes.fontSizeMedium
				},
				selectIcon: {
					height: '2.5rem',
					width: '2.5rem',
					fontSize: '2.5rem'
				},
				actions: {
					button: {
						svg: {
							height: '2rem',
							width: '2rem',
							fontSize: '2.5rem'
						}
					}
				}
			}
		}
	}
}

export { AppTablePaginationTheme }
