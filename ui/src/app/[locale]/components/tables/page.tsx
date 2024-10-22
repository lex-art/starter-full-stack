'use client'
import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppTable from '@/components/Common/DataDisplay/Table/Table'
import AppTableBody from '@/components/Common/DataDisplay/Table/TableBody'
import AppTableCell from '@/components/Common/DataDisplay/Table/TableCell'
import AppTableContainer from '@/components/Common/DataDisplay/Table/TableContainer'
import { AppTableHead } from '@/components/Common/DataDisplay/Table/TableHead'
import AppTableRow from '@/components/Common/DataDisplay/Table/TableRow'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppBox from '@/components/Common/Layout/Box'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import AppPaper from '@/components/Common/Layout/Paper'
import AppDataTable, { HeadCell } from '@/components/DataTable/DataTable'

export const headerCells: Array<HeadCell> = [
	{
		id: 'address',
		label: 'common.autocomplete',
		sortable: true
	},
	{
		id: 'postalCode',
		label: 'common.autocomplete',
		numeric: true
	},
	{
		id: 'country',
		label: 'common.autocomplete'
	},
	{
		id: 'state',
		label: 'components.tabs',
		colSpan: 3
	},
	{
		id: 'createdDate',
		label: 'components.autocomplete',
		sortable: true
	}
]

export default function Tables() {
	return (
		<AppGrid width="100%">
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
									<AppTableCell rowSpan={2}>
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
									<AppTableCell rowSpan={2}>
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
					<AppDataTable
						headerCells={headerCells}
						rowsCells={[
							{
								id: 1,
								hover: true,
								data: {
									address: 'address',
									postalCode: 12345,
									country: 'country',
									state:
										'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe necessitatibus laboriosam, illo vero ut beatae suscipit? Minima consequatur eum tenetur dolorem in ipsam rerum accusamus, ratione asperiores placeat! Quibusdam, inventore?',
									createdDate: 'createdDate'
								}
							},
							{
								id: 2,
								hover: true,
								data: {
									address: 'address 2',
									postalCode: 1234567,
									country: 'country 2',
									state: 'state 2',
									createdDate: 'createdDate 2'
								}
							}
						]}
					/>
				</AppPaper>
			</AppGrid>
		</AppGrid>
	)
}
