import { FC, forwardRef, ReactNode, use } from 'react'
import AppTableContainer from '../Common/DataDisplay/Table/TableContainer'
import AppBox from '../Common/LAyout/Box'
import { TablePaginationProps, TableSortLabel } from '@mui/material'
import AppTable from '../Common/DataDisplay/Table/Table'
import { AppTableHead } from '../Common/DataDisplay/Table/TableHead'
import AppTableRow from '../Common/DataDisplay/Table/TableRow'
import AppTableCell from '../Common/DataDisplay/Table/TableCell'
import AppTypography from '../Common/DataDisplay/Typography/Typography'
import { useTranslations } from 'next-intl'
import AppTableBody from '../Common/DataDisplay/Table/TableBody'
import AppCircularLoader from '../Common/FeedBack/CircularLoader/CicularLoader'
import { IntlMessages } from '@/global'

export interface HeadCell {
	id: string
	label: `${keyof IntlMessages}.${keyof IntlMessages[keyof IntlMessages]}`
	numeric?: boolean
	sortable?: boolean
	contex?: { count: number }
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
	pagination?: TablePaginationProps
	orderBy?: string
	order?: 'asc' | 'desc'
	onSort?: (orderBy: string, order: 'asc' | 'desc') => void
}

const AppDataTable: FC<AppDataTableProps> = forwardRef<HTMLDivElement, AppDataTableProps>(
	({ headerCells, rowsCells, loading, minHeightTable, pagination, order, orderBy, onSort }, ref) => {
		const t = useTranslations()
		return (
			<AppTableContainer ref={ref} component={AppBox}>
				<AppTable
					sx={{
						xs: { minWidth: 650 },
						sm: { minWidth: 700 }
					}}
				>
					<AppTableHead>
						<AppTableRow>
							{headerCells.map((headCell: HeadCell) => (
								<AppTableCell key={headCell.id} align={headCell.numeric ? 'right' : 'center'} colSpan={1}>
									{headCell.sortable ? (
										<TableSortLabel
											active={orderBy === headCell.id}
											direction={order}
											onClick={() => onSort && onSort(headCell.id, order === 'asc' ? 'desc' : 'asc')}
										>
											<AppTypography variant="body2" fontFamily="RobotoBold">
												{t(headCell.label, headCell.contex)}
											</AppTypography>
										</TableSortLabel>
									) : (
										<AppTypography variant="body2" fontFamily="RobotoBold">
											{t(headCell.label, headCell.contex)}
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
								//sx={{ cursor: row.onClick ? 'pointer' : 'default' }}
							>
								{headerCells.map((headCell: HeadCell) => (
									<AppTableCell
										key={`${row.id}-${headCell.id}`}
										align={headCell.numeric ? 'right' : 'center'}
										colSpan={1}
										sx={{
											wordBreak:
												row?.skipBreakWordsCells &&
												row.skipBreakWordsCells.find((value) => value === headCell.id)
													? 'normal'
													: 'break-word'
										}}
									>
										<AppTypography variant="body2">{row?.data[headCell.id]}</AppTypography>
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
										<AppTypography variant="body2" fontFamily="RobotoBold" textAlign="center">
											{t('noResults')}
										</AppTypography>
									)}
								</AppTableCell>
							</AppTableRow>
						)}
					</AppTableBody>
				</AppTable>
			</AppTableContainer>
		)
	}
)

AppDataTable.displayName = 'AppDataTable'
export default AppDataTable
