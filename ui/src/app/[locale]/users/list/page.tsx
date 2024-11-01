'use client'
import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import AppPaper from '@/components/Common/Layout/Paper'
import AppDataTable from '@/components/DataTable/DataTable'
import { HeadCell } from '@/components/DataTable/theme'

const header: Array<HeadCell> = [
	{
		id: 'id',
		label: 'dataTable.head.id',
		sortable: true
	},
	{
		id: 'name',
		label: 'dataTable.head.name'
	},
	{
		id: 'email',
		label: 'dataTable.head.email'
	},
	{
		id: 'role',
		label: 'dataTable.head.role'
	},
	{
		id: 'actions',
		label: 'dataTable.head.actions'
	}
]

const rows = [
	{
		id: 1,
		data: {
			id: 1,
			name: 'John Doe',
			email: 'user@example.com',
			role: 'Admin',
			actions: 'Edit | Delete'
		}
	}
]
export default function ListUsers() {
	return (
		<AppGrid maxWidth="100%">
			<AppTypography variant="h1" fontWeight={400}>
				List Users
			</AppTypography>
			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography fontWeight={400}>Users</AppTypography>
			</AppDivider>
			<AppPaper elevation={5}>
				<AppDataTable
					headerCells={header}
					rowsCells={rows.map((item) => ({
						id: item.id,
						hover: true,
						data: {
							id: item.id,
							name: item.data.name,
							email: item.data.email,
							role: item.data.role,
							actions: item.data.actions
						}
					}))}
					orderBy="id"
					order="asc"
					onSort={() => {}}
					pagination={{
						limit: 10,
						total: 1,
						page: 1,
						setPage: () => {},
						setRowsPerPage: () => {}
					}}
				/>
			</AppPaper>
		</AppGrid>
	)
}
