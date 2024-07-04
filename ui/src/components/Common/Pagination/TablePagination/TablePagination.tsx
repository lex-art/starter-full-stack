'use client'
import { TablePagination } from '@mui/material'
import { useTranslations } from 'next-intl'
import React, { FC, forwardRef, useState } from 'react'

export interface TablePaginationProps {
	limit?: number
	total?: number
	page?: number
	setPage?(newPage: number): void
	setRowsPerPage?(rowsPerPage: number): void
}

const AppTablePagination: FC<TablePaginationProps> = forwardRef<HTMLDivElement, TablePaginationProps>(
	({ limit = 10, total = 0, page = 1, setPage, setRowsPerPage }, ref) => {
		const t = useTranslations('components')
		const rowsPerPageOptions = [10, 25, 50, 100]
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
				ref={ref}
				component="div"
				count={total}
				page={page - 1}
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={rowsPerPageOptions}
				labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${t('of')} ${count}`}
				labelRowsPerPage={t('rowsPerPage')}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		)
	}
)

AppTablePagination.displayName = 'AppTablePagination'
export default AppTablePagination
