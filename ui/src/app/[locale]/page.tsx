import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import AppPaper from '@/components/Common/Layout/Paper'
import AppGauges from '@/components/chartsExamples/Guages'
import AppSparkLine from '@/components/chartsExamples/SparkLine'
import { font } from '@/lib/designTokens'
import userPermission from '@/lib/hooks/userPermission'
import { getServerSession } from 'next-auth'
import { cookies } from 'next/headers'
import AppBarChart from '../../components/chartsExamples/Bar'
import AppLineChart from '../../components/chartsExamples/Line'
import AppPie from '../../components/chartsExamples/Pie'
import AppScatter from '../../components/chartsExamples/Scatter'
import configAuth from '../api/auth/configAuth'

export default async function Index() {
	const session = await getServerSession(configAuth)
	const cookie = cookies()
	const token = cookie.get('next-auth.session-token')
	//const locale = useLocale() //TODO: get locale from session from header and set from ui
	const access = userPermission('projects')

	return (
		<AppGrid width="100%" height="100%">
			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography
					variant="subtitle2"
					fontWeight="Bold"
					sx={{
						whiteSpace: 'nowrap'
					}}
				>
					Session data
				</AppTypography>
			</AppDivider>
			<code
				style={{
					fontSize: font.sizes.fontSizeMedium,
					whiteSpace: 'pre-line',
					wordWrap: 'break-word'
				}}
			>
				{JSON.stringify(session, null, 2)}
			</code>
			<br />

			<code
				style={{
					fontSize: font.sizes.fontSizeMedium,
					whiteSpace: 'pre-line',
					wordWrap: 'break-word'
				}}
			>
				{JSON.stringify(token, null, 2)}
			</code>
			<br />
			{/* <code
				style={{
					fontSize: font.sizes.fontSizeMedium
				}}
			>
				{locale}
			</code> */}
			<br />
			<code
				style={{
					fontSize: font.sizes.fontSizeMedium
				}}
			>
				{JSON.stringify(access, null, 2)}
			</code>
			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography
					variant="subtitle2"
					fontWeight="Bold"
					sx={{
						whiteSpace: 'nowrap'
					}}
				>
					Charts
				</AppTypography>
			</AppDivider>
			<AppPaper
				elevation={5}
				sx={{
					padding: 2
				}}
			>
				<AppTypography variant="body1" fontWeight="bold">
					Bar chart
				</AppTypography>
				<AppGrid
					container
					display="grid"
					gap="2rem"
					gridTemplateColumns={{
						xs: '1fr',
						sm: '1fr',
						lg: '49% 1fr',
						xl: '49% 1fr'
					}}
				>
					<AppBarChart />
					<AppLineChart />
				</AppGrid>
			</AppPaper>

			<AppPaper
				elevation={5}
				sx={{
					padding: 2,
					mt: 2
				}}
			>
				<AppTypography variant="body1" fontWeight="bold">
					Bar chart
				</AppTypography>
				<AppGrid
					container
					display="grid"
					gap="2rem"
					gridTemplateColumns={{
						xs: '1fr',
						sm: '1fr',
						lg: '49% 1fr',
						xl: '49% 1fr'
					}}
				>
					<AppScatter />
					<AppPie />
				</AppGrid>
			</AppPaper>
			<AppPaper
				elevation={5}
				sx={{
					padding: 2,
					mt: 2
				}}
			>
				<AppTypography variant="body1" fontWeight="bold">
					Bar chart
				</AppTypography>
				<AppGrid
					container
					display="grid"
					gap="2rem"
					gridTemplateColumns={{
						xs: '1fr',
						sm: '1fr',
						lg: '49% 1fr',
						xl: '49% 1fr'
					}}
				>
					<AppSparkLine />
					<AppGauges />
				</AppGrid>
			</AppPaper>
		</AppGrid>
	)
}
