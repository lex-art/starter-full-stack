import { FC, forwardRef, ReactNode } from 'react'
import AppTableContainer from '../Common/DataDisplay/Table/TableContainer'
import AppBox from '../Common/Layout/Box'
import { TableSortLabel, ThemeOptions } from '@mui/material'
import AppTable from '../Common/DataDisplay/Table/Table'
import { AppTableHead } from '../Common/DataDisplay/Table/TableHead'
import AppTableRow from '../Common/DataDisplay/Table/TableRow'
import AppTableCell from '../Common/DataDisplay/Table/TableCell'
import AppTypography from '../Common/DataDisplay/Typography/Typography'
import { useTranslations } from 'next-intl'
import AppTableBody from '../Common/DataDisplay/Table/TableBody'
import AppCircularLoader from '../Common/FeedBack/CircularLoader/CircularLoader'
import { IntlMessages } from '@/global'
import AppTablePagination, { AppTablePaginationProps } from '../TablePagination/TablePagination'

type Primitive = string | number | boolean | undefined | null

type NestedKeyOf<ObjectType extends object> = {
	[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends Primitive
		? `${Key}`
		: ObjectType[Key] extends Array<infer ArrayType extends object>
			? `${Key}` | `${Key}.${NestedKeyOf<ArrayType>}`
			: ObjectType[Key] extends object
				? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
				: never
}[keyof ObjectType & (string | number)]

const AppDataTableTheme: ThemeOptions = {
	components: {
		MuiTableSortLabel: {
			styleOverrides: {
				root: {
					'& .MuiTableSortLabel-icon': {
						color: 'green ',
						height: '2.5rem',
						width: '2.5rem'
					}
				}
			}
		}
	}
}
export interface HeadCell {
	id: string
	label: NestedKeyOf<IntlMessages>
	numeric?: boolean
	sortable?: boolean
	context?: { count: number }
	colSpan?: number
	rowSpan?: number
}

export interface RowCell {
	id: number | string
	data: Record<string, ReactNode>
	hover?: boolean
	onClick?: (id: number | string) => void
	skipBreakWordsCells?: Array<string>
}

export interface AppDataTableProps {
	headerCells: Array<HeadCell>
	rowsCells: Array<RowCell>
	loading?: boolean
	minHeightTable?: string
	pagination?: AppTablePaginationProps
	orderBy?: string
	order?: 'asc' | 'desc'
	onSort?: (orderBy: string, order: 'asc' | 'desc') => void
}

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
												<AppTypography fontWeight="bold">{t(headCell.label, headCell.context)}</AppTypography>
											</TableSortLabel>
										) : (
											<AppTypography fontWeight="bold">{t(headCell.label, headCell.context)}</AppTypography>
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
												wordBreak: row?.skipBreakWordsCells?.find((value) => value === headCell.id)
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

export { AppDataTable, AppDataTableTheme }

AppDataTable.displayName = 'AppDataTable'
export default AppDataTable
