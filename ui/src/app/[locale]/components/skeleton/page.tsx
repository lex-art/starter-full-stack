import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppSkeleton from '@/components/Common/FeedBack/Skeleton/Skeleton'
import AppBox from '@/components/Common/Layout/Box'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import AppPaper from '@/components/Common/Layout/Paper'
const data = [
	{
		src: 'https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ',
		title: 'Don Diablo @ Tomorrowland Main Stage 2019 | Official…',
		channel: 'Don Diablo',
		views: '396k views',
		createdAt: 'a week ago'
	},
	{
		src: 'https://i.ytimg.com/vi/_Uu12zY01ts/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCpX6Jan2rxrCAZxJYDXppTP4MoQA',
		title: 'Queen - Greatest Hits',
		channel: 'Queen Official',
		views: '40M views',
		createdAt: '3 years ago'
	},
	{
		src: 'https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw',
		title: 'Calvin Harris, Sam Smith - Promises (Official Video)',
		channel: 'Calvin Harris',
		views: '130M views',
		createdAt: '10 months ago'
	}
]

interface MediaProps {
	loading?: boolean
}

function Media(props: MediaProps) {
	const { loading = false } = props

	return (
		<AppGrid container wrap="nowrap">
			{(loading ? Array.from(new Array(3)) : data).map((item, index) => (
				<AppBox key={index} sx={{ width: 210, marginRight: 2, my: 5 }}>
					{item ? (
						<img style={{ width: 210, height: 118 }} alt={item.title} src={item.src} />
					) : (
						<AppSkeleton variant="rectangular" width={210} height={118} />
					)}
					{item ? (
						<AppBox sx={{ pr: 2 }}>
							<AppTypography gutterBottom variant="body2">
								{item.title}
							</AppTypography>
							<AppTypography display="block" variant="caption" color="text.secondary">
								{item.channel}
							</AppTypography>
							<AppTypography variant="caption" color="text.secondary">
								{`${item.views} • ${item.createdAt}`}
							</AppTypography>
						</AppBox>
					) : (
						<AppBox sx={{ pt: 0.5 }}>
							<AppSkeleton />
							<AppSkeleton width="60%" />
						</AppBox>
					)}
				</AppBox>
			))}
		</AppGrid>
	)
}
export default function Skeleton() {
	return (
		<AppGrid item width="100%">
			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography variant="subtitle2">Menus</AppTypography>
			</AppDivider>
			<AppGrid container display="grid">
				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTypography variant="body1" fontWeight="bold">
						Skeleton
					</AppTypography>
					<AppBox display="grid" gap={3}>
						{/* For variant="text", adjust the height via font-size */}
						<AppSkeleton variant="text" sx={{ fontSize: '2rem' }} />

						{/* For other variants, adjust the size with `width` and `height` */}
						<AppSkeleton variant="circular" width={80} height={80} />
						<AppSkeleton variant="rectangular" width={410} height={60} />
						<AppSkeleton variant="rounded" width={410} height={60} />
					</AppBox>
					<AppBox sx={{ overflow: 'hidden' }}>
						<Media loading />
						<Media />
					</AppBox>
				</AppPaper>
			</AppGrid>
		</AppGrid>
	)
}
