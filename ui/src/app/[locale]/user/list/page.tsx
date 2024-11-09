'use client'
import { listUsersAction } from '@/actions/users/list.action'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import AppPaper from '@/components/Common/Layout/Paper'
import AppDataTable from '@/components/DataTable/DataTable'
import { HeadCell } from '@/components/DataTable/theme'
import { Link } from '@/i18n/routing'
import { API_URLS } from '@/lib/utilities/emun'
import { IFullUser, PaginateOptions } from '@/types'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'
import useSWRInfinite from 'swr/infinite'

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

const fetcher = async (url: string) => (await listUsersAction(url)).data

export default function ListUsers() {
	const { enqueueSnackbar } = useSnackbar()
	const t = useTranslations()
	const searchParams = useSearchParams()
	const params = new URLSearchParams(searchParams)
	const pathname = usePathname()
	const route = useRouter()
	const pagination: PaginateOptions = {
		page: parseInt(params.get('page')?.toString() || '1'),
		limit: parseInt(params.get('limit')?.toString() || '10'),
		orderBy: params.get('orderBy')?.toString() || 'createdAt',
		orderColumn: params.get('orderColumn')?.toString() || 'desc'
	}
	const getKey = (_: number, previousPageData: Array<number>) => {
		if (previousPageData && !previousPageData.length) return null
		return (
			API_URLS.USER_LIST +
			`?page=${pagination.page}&limit=${pagination.limit}&orderBy=${pagination.orderBy}&orderColumn=${pagination.orderColumn}`
		)
	}

	const { data, error, isLoading } = useSWRInfinite(getKey, fetcher, {
		revalidateOnFocus: true,
		revalidateOnMount: true
	})
	const users = data ? data.flatMap((page) => page?.data || []) : []
	pagination.total = data ? data[0]?.total : 0

	useEffect(() => {
		if (error) {
			enqueueSnackbar(JSON.stringify(error, null), { variant: 'error' })
		}
	}, [error])

	return (
		<AppGrid maxWidth="100%">
			<AppTypography variant="subtitle1" fontWeight={400}>
				List Users
			</AppTypography>
			<AppPaper elevation={5}>
				<AppDataTable
					headerCells={header}
					loading={isLoading}
					minHeightTable="calc(100dvh - 25rem)"
					rowsCells={
						users
							? users?.map((item: IFullUser) => ({
									id: item?.user.idUser,
									hover: true,
									data: {
										id: item?.user.idUser,
										name: item?.firstName + ' ' + item?.lastName,
										email: item?.user.email,
										role: item?.user.role,
										actions: (
											<Link href={`/user/${btoa(item?.user.email)}`}>
												<AppTypography color="primary">
													{t('common.edit')}
												</AppTypography>
											</Link>
										)
									}
								})) || []
							: []
					}
					orderBy={pagination.orderBy}
					order={pagination.orderColumn as 'asc' | 'desc'}
					onSort={(_: string, order: 'asc' | 'desc') => {
						params.set('page', '1')
						params.set('orderColumn', order)
						route.replace(`${pathname}?${params.toString()}`)
					}}
					pagination={{
						limit: pagination.limit,
						total: pagination.total,
						page: pagination.page,
						setPage: (newPage: number) => {
							params.set('page', newPage.toString())
							route.replace(`${pathname}?${params.toString()}`)
						},
						setRowsPerPage: (rowsPerPage: number) => {
							params.set('page', '1')
							params.set('limit', rowsPerPage.toString())
							route.replace(`${pathname}?${params.toString()}`)
						}
					}}
				/>
			</AppPaper>
		</AppGrid>
	)
}
