import { ThemeOptions } from '@mui/material'
import { ReactNode } from 'react'
import { AppTablePaginationProps } from '../TablePagination/theme'

type Paths<Schema, Path extends string = ''> = Schema extends string
	? Path
	: Schema extends object
		? {
				[K in keyof Schema & string]: Paths<
					Schema[K],
					`${Path}${Path extends '' ? '' : '.'}${K}`
				>
			}[keyof Schema & string]
		: never

interface HeadCell {
	id: string
	label: Paths<IntlMessages>
	numeric?: boolean
	sortable?: boolean
	context?: { count: number }
	colSpan?: number
	rowSpan?: number
}

interface RowCell {
	id: number | string
	data: Record<string, ReactNode>
	hover?: boolean
	onClick?: (id: number | string) => void
	skipBreakWordsCells?: Array<string>
}

interface AppDataTableProps {
	headerCells: Array<HeadCell>
	rowsCells: Array<RowCell>
	loading?: boolean
	minHeightTable?: string
	pagination?: AppTablePaginationProps
	orderBy?: string
	order?: 'asc' | 'desc'
	onSort?: (orderBy: string, order: 'asc' | 'desc') => void
}

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
export { AppDataTableTheme }
export type { AppDataTableProps, HeadCell, RowCell }
