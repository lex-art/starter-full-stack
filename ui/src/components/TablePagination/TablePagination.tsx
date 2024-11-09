import { TablePagination } from '@mui/material'
import { useTranslations } from 'next-intl'
import { FC, useState } from 'react'
import { AppTablePaginationProps } from './theme'

const AppTablePagination: FC<AppTablePaginationProps> = ({
	limit = 10,
	total = 0,
	page = 1,
	setPage,
	setRowsPerPage,
	rowsPerPageOptions
}) => {
	const t = useTranslations('common')
	const [rowsPerPage, setRowsPerPageState] = useState<number>(limit ?? 10)
	const handleChangePage = (_: unknown, newPage: number) => {
		setPage && setPage(newPage + 1)
	}

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const rowsSelected = parseInt(event.target.value, 10)
		setRowsPerPageState(rowsSelected)
		setRowsPerPage && setRowsPerPage(rowsSelected)
	}

	return (
		<TablePagination
			rowsPerPageOptions={
				rowsPerPageOptions ?? [10, 25, 50, { value: -1, label: t('all') }]
			}
			component="div"
			count={total}
			rowsPerPage={rowsPerPage}
			page={page - 1}
			onPageChange={handleChangePage}
			onRowsPerPageChange={handleChangeRowsPerPage}
			labelDisplayedRows={({ from, to, count }) =>
				`${from}-${to} ${t('of')} ${count}`
			}
			labelRowsPerPage={t('rowsPerPage')}
		/>
	)
}

AppTablePagination.displayName = 'AppTablePagination'
export default AppTablePagination
