'use client'
import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppTable from '@/components/Common/DataDisplay/Table/Table'
import AppTableBody from '@/components/Common/DataDisplay/Table/TableBody'
import AppTableCell from '@/components/Common/DataDisplay/Table/TableCell'
import AppTableContainer from '@/components/Common/DataDisplay/Table/TableContainer'
import { AppTableHead } from '@/components/Common/DataDisplay/Table/TableHead'
import AppTableRow from '@/components/Common/DataDisplay/Table/TableRow'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppBox from '@/components/Common/LAyout/Box'
import AppGrid from '@/components/Common/LAyout/Grid/Grid'
import AppPaper from '@/components/Common/LAyout/Paper'
import AppDataTable, { HeadCell } from '@/components/DataTable/DataTable'
import React from 'react'

export const headerCells: Array<HeadCell> = [
	{
		id: 'address',
		label: 'common.autocomplete'
	},
	{
		id: 'postalCode',
		label: 'common.autocomplete'
	},
	{
		id: 'country',
		label: 'common.autocomplete'
	},
	{
		id: 'state',
		label: 'components.tabs'
	},
	{
		id: 'createdDate',
		label: 'components.autocomplete',
		sortable: true
	}
]

export default function Tables() {
	return (
		<AppGrid item width="100%">
			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography variant="subtitle2">Menus</AppTypography>
			</AppDivider>
			<AppGrid
				container
				display="grid"
				gap="2rem"
				gridTemplateColumns={{
					xs: '1fr',
					sm: '1fr',
					lg: '49% 1fr',
					xl: '49% 1fr',
					xxl: '49% 1fr'
				}}
			>
				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTypography variant="body1" fontWeight="bold">
						Basic table
					</AppTypography>
					<AppTableContainer component={AppBox}>
						<AppTable stickyHeader>
							<AppTableHead>
								<AppTableRow>
									<AppTableCell>
										<AppTypography fontWeight="bold">Header 1</AppTypography>
									</AppTableCell>
									<AppTableCell>
										<AppTypography fontWeight="bold">Header 2</AppTypography>
									</AppTableCell>
									<AppTableCell>
										<AppTypography fontWeight="bold">Header 3</AppTypography>
									</AppTableCell>
									<AppTableCell>
										<AppTypography fontWeight="bold">Header 4</AppTypography>
									</AppTableCell>
								</AppTableRow>
							</AppTableHead>
							<AppTableBody>
								<AppTableRow>
									<AppTableCell>
										<AppTypography>Row 1</AppTypography>
									</AppTableCell>
									<AppTableCell>
										<AppTypography>Row 2</AppTypography>
									</AppTableCell>
									<AppTableCell>
										<AppTypography>Row 3</AppTypography>
									</AppTableCell>
									<AppTableCell>
										<AppTypography>Row 4</AppTypography>
									</AppTableCell>
								</AppTableRow>
								<AppTableRow>
									<AppTableCell>
										<AppTypography>Row 1</AppTypography>
									</AppTableCell>
									<AppTableCell>
										<AppTypography>Row 2</AppTypography>
									</AppTableCell>
									<AppTableCell>
										<AppTypography>Row 3</AppTypography>
									</AppTableCell>
									<AppTableCell>
										<AppTypography>Row 4</AppTypography>
									</AppTableCell>
								</AppTableRow>
							</AppTableBody>
						</AppTable>
					</AppTableContainer>
				</AppPaper>

				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTypography variant="body1" fontWeight="bold">
						Dense table
					</AppTypography>
					<AppTableContainer component={AppPaper}>
						<AppTable stickyHeader size="small" aria-label="a dense table">
							<AppTableHead>
								<AppTableRow>
									<AppTableCell>
										<AppTypography fontWeight="bold">Header 1</AppTypography>
									</AppTableCell>
									<AppTableCell>
										<AppTypography fontWeight="bold">Header 2</AppTypography>
									</AppTableCell>
									<AppTableCell>
										<AppTypography fontWeight="bold">Header 3</AppTypography>
									</AppTableCell>
									<AppTableCell>
										<AppTypography fontWeight="bold">Header 4</AppTypography>
									</AppTableCell>
								</AppTableRow>
							</AppTableHead>
							<AppTableBody>
								<AppTableRow>
									<AppTableCell>
										<AppTypography>Row 1</AppTypography>
									</AppTableCell>
									<AppTableCell>
										<AppTypography>Row 2</AppTypography>
									</AppTableCell>
									<AppTableCell>
										<AppTypography>Row 3</AppTypography>
									</AppTableCell>
									<AppTableCell>
										<AppTypography>Row 4</AppTypography>
									</AppTableCell>
								</AppTableRow>
								<AppTableRow>
									<AppTableCell>
										<AppTypography>Row 1</AppTypography>
									</AppTableCell>
									<AppTableCell>
										<AppTypography>Row 2</AppTypography>
									</AppTableCell>
									<AppTableCell>
										<AppTypography>Row 3</AppTypography>
									</AppTableCell>
									<AppTableCell>
										<AppTypography>Row 4</AppTypography>
									</AppTableCell>
								</AppTableRow>
							</AppTableBody>
						</AppTable>
					</AppTableContainer>
				</AppPaper>
			</AppGrid>
			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography variant="subtitle2">Data Table</AppTypography>
			</AppDivider>
			<AppGrid container display="grid" gap="2rem">
				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTypography variant="body1" fontWeight="bold">
						Data table
					</AppTypography>
					<AppDataTable headerCells={headerCells} rowsCells={[]} />
				</AppPaper>
			</AppGrid>
		</AppGrid>
	)
}
