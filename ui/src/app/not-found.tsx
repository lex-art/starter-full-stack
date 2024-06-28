import AppBox from '@/components/Common/Containers/Box'
import AppGrid from '@/components/Common/Grid/Grid'
import AppTypography from '@/components/Common/Typography/Typography'
import { headers } from 'next/headers'

// Render the default Next.js 404 page when a route
// is requested that doesn't match the middleware and
// therefore doesn't have a locale associated with it.

export default async function NotFound() {
	const headersList = headers()
	const domain = headersList.get('host')
	return (
		<html lang="en">
			<body>
				<AppGrid
					container
					height="100vh"
					width="100vw"
					justifyContent="center"
					alignItems="center"
					sx={{
						backgroundColor: 'primary.main',
						color: 'white'
					}}
				>
					<AppBox
						sx={{
							textAlign: 'center'
						}}
					>
						<AppTypography variant="h1">404</AppTypography>
						<AppTypography variant="h2">Page Not Found {domain}</AppTypography>
						<AppTypography variant="h2">
							This a custom 404 page. You can customize it by editing the{' '}
							<code>ui/src/app/not-found.tsx</code> file.
						</AppTypography>
					</AppBox>
				</AppGrid>
			</body>
		</html>
	)
}
