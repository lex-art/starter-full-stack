'use client'
import { Breadcrumbs, Link } from '@mui/material'
import { usePathname } from 'next/navigation'
import AppTypography from '../Common/DataDisplay/Typography/Typography'

const AppBreadcrumb = () => {
	const router = usePathname()
	const pathnames = router.split('/').filter((x) => x)

	return (
		<Breadcrumbs
			aria-label="breadcrumb"
			sx={{
				mb: 2
			}}
		>
			{pathnames.map((value, index) => {
				const last = index === pathnames.length - 1
				const href = `/${pathnames.slice(0, index + 1).join('/')}`

				return last ? (
					<AppTypography key={href} color="text.primary">
						{value}
					</AppTypography>
				) : (
					<Link key={href} href={href} color="inherit">
						{value}
					</Link>
				)
			})}
		</Breadcrumbs>
	)
}

export { AppBreadcrumb }
export default AppBreadcrumb
