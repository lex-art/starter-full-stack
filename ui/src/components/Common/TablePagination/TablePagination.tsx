import { font } from '@/lib/design-tokens'
import { TablePagination, ThemeOptions } from '@mui/material'
import { useTranslations } from 'next-intl'
import { FC, useState } from 'react'

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
					paddingRight: '0.6rem'
				},
				selectLabel: {
					fontSize: font.sizes.fontSizeMedium
				},
				selectIcon: {
					height: '3.5rem',
					width: '3.5rem',
					fontSize: '3.5rem'
				},
				actions: {
					button: {
						svg: {
							height: '3.5rem',
							width: '3.5rem',
							fontSize: '3rem'
						}
					}
				}
			}
		}
	}
}

export interface AppTablePaginationProps {
	limit?: number
	total?: number
	page?: number
	setPage?(newPage: number): void
	setRowsPerPage?(rowsPerPage: number): void
}
const AppTablePagination: FC<AppTablePaginationProps> = ({
	limit = 10,
	total = 0,
	page = 1,
	setPage,
	setRowsPerPage
}) => {
	const t = useTranslations('common')
	const [rowsPerPage, setRowsPerPageState] = useState(limit ?? 10)
	const handleChangePage = (_: unknown, newPage: number) => {
		setPage && setPage(newPage + 1)
	}

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const rowsSelected = parseInt(event.target.value, 10)
		setRowsPerPageState(rowsSelected)
		setRowsPerPage && setRowsPerPage(rowsSelected)
	}

	return (
		<TablePagination
			rowsPerPageOptions={[10, 25, 50]}
			component="div"
			count={total}
			rowsPerPage={rowsPerPage}
			page={page - 1}
			onPageChange={handleChangePage}
			onRowsPerPageChange={handleChangeRowsPerPage}
			labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${t('of')} ${count}`}
			labelRowsPerPage={t('rowsPerPage')}
		/>
	)
}

AppTablePagination.displayName = 'AppTablePagination'
export { AppTablePagination, AppTablePaginationTheme }
export default AppTablePagination
