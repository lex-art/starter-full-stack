import { TableSortLabel } from '@mui/material'
import { useTranslations } from 'next-intl'
import { FC, forwardRef } from 'react'
import AppTable from '../Common/DataDisplay/Table/Table'
import AppTableBody from '../Common/DataDisplay/Table/TableBody'
import AppTableCell from '../Common/DataDisplay/Table/TableCell'
import AppTableContainer from '../Common/DataDisplay/Table/TableContainer'
import { AppTableHead } from '../Common/DataDisplay/Table/TableHead'
import AppTableRow from '../Common/DataDisplay/Table/TableRow'
import AppTypography from '../Common/DataDisplay/Typography/Typography'
import AppCircularLoader from '../Common/FeedBack/CircularLoader/CircularLoader'
import AppBox from '../Common/Layout/Box'
import AppTablePagination from '../TablePagination/TablePagination'
import { AppDataTableProps, HeadCell, RowCell } from './theme'

const AppDataTable: FC<AppDataTableProps> = forwardRef<HTMLDivElement, AppDataTableProps>(
	({ headerCells, rowsCells, loading, minHeightTable, pagination, order, orderBy, onSort }, ref) => {
		const t = useTranslations()
		return (
			<AppBox>
				<AppTableContainer
					ref={ref}
					component={AppBox}
					sx={{
						minHeight: minHeightTable ?? '100%'
					}}
				>
					<AppTable
						sx={{
							xs: { minWidth: 650 },
							sm: { minWidth: 700 }
						}}
					>
						<AppTableHead>
							<AppTableRow>
								{headerCells.map((headCell: HeadCell) => (
									<AppTableCell
										key={headCell.id}
										align={headCell.numeric ? 'right' : 'center'}
										colSpan={headCell.colSpan ?? 1}
										rowSpan={headCell.rowSpan ?? 1}
									>
										{headCell.sortable ? (
											<TableSortLabel
												active={orderBy === headCell.id}
												direction={order}
												onClick={() => onSort && onSort(headCell.id, order === 'asc' ? 'desc' : 'asc')}
											>
												<AppTypography fontWeight="bold">
													{t(headCell.label, headCell.context)}
												</AppTypography>
											</TableSortLabel>
										) : (
											<AppTypography fontWeight="bold">
												{t(headCell.label, headCell.context)}
											</AppTypography>
										)}
									</AppTableCell>
								))}
							</AppTableRow>
						</AppTableHead>
						<AppTableBody>
							{rowsCells?.map((row: RowCell) => (
								<AppTableRow
									key={row.id}
									hover={!!row.onClick || !!row.hover}
									onClick={() => (row.onClick ? row.onClick(row.id) : null)}
									sx={{ cursor: row.onClick ? 'pointer' : 'default' }}
								>
									{headerCells.map((headCell: HeadCell) => (
										<AppTableCell
											key={`${row.id}-${headCell.id}`}
											align={headCell.numeric ? 'right' : 'center'}
											colSpan={headCell.colSpan ?? 1}
											rowSpan={headCell.rowSpan ?? 1}
											sx={{
												wordBreak: row?.skipBreakWordsCells?.find((value: string) => value === headCell.id)
													? 'normal'
													: 'break-word'
											}}
										>
											<AppTypography>{row?.data[headCell.id]}</AppTypography>
										</AppTableCell>
									))}
								</AppTableRow>
							))}
							{(loading || rowsCells?.length === 0) && (
								<AppTableRow
									style={{
										height: 100
									}}
								>
									<AppTableCell align="center" colSpan={headerCells.length}>
										{loading ? (
											<AppCircularLoader color="secondary" />
										) : (
											<AppTypography fontWeight="bold" textAlign="center">
												{t('components.noResults')}
											</AppTypography>
										)}
									</AppTableCell>
								</AppTableRow>
							)}
						</AppTableBody>
					</AppTable>
				</AppTableContainer>
				<AppTablePagination
					limit={pagination?.limit}
					total={pagination?.total}
					page={pagination?.page}
					setPage={pagination?.setPage}
					setRowsPerPage={pagination?.setRowsPerPage}
				/>
			</AppBox>
		)
	}
)

AppDataTable.displayName = 'AppDataTable'
export default AppDataTable
