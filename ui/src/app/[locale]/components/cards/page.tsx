'use client'
import AppAvatar from '@/components/Common/DataDisplay/Avtar/Avatar'
import AppButton from '@/components/Common/Inputs/Button/Button'
import AppCard from '@/components/Common/Surfaces/Card/Card'
import AppCardActions from '@/components/Common/Surfaces/Card/CardActions'
import AppCardContent from '@/components/Common/Surfaces/Card/CardContent'
import AppCardHeader from '@/components/Common/Surfaces/Card/CardHeader'
import AppCardMedia from '@/components/Common/Surfaces/Card/CardMedia'
import AppCollapse from '@/components/Common/Surfaces/Collapse/Collapse'
import AppBox from '@/components/Common/Layout/Box'
import AppPaper from '@/components/Common/Layout/Paper'
import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import AppIconButton from '@/components/Common/Inputs/IconButton/IconButton'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import { ExpandCircleDown, Favorite, MoreVert } from '@mui/icons-material'
import React from 'react'

export default function Cards() {
	const [expanded, setExpanded] = React.useState(false)
	return (
		<AppGrid item width="100%">
			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography variant="subtitle2">Cards</AppTypography>
			</AppDivider>
			<AppGrid container display="grid" gap="2rem">
				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTypography variant="body1" fontWeight="bold">
						Font
					</AppTypography>
					<AppBox gap={2} display="flex" flexWrap="wrap">
						<AppCard variant="outlined" sx={{ minWidth: 345, maxWidth: 345, minHeight: 400 }}>
							<AppCardHeader title="Header" />
							<AppCardMedia component="img" image="https://w.wallhaven.cc/full/2y/wallhaven-2yx5og.jpg" />
							<AppCardContent>
								<AppTypography variant="body1">
									Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus officiis perferendis
									consequuntur minus culpa delectus labore quo commodi dolore ullam animi, nulla tenetur ex
									minima accusamus sit, voluptas nobis vitae!
								</AppTypography>
							</AppCardContent>
							<AppCardActions disableSpacing>
								<Favorite />

								<AppIconButton onClick={() => setExpanded(!expanded)}>
									<ExpandCircleDown />
								</AppIconButton>
							</AppCardActions>
							<AppCollapse in={expanded} timeout="auto" unmountOnExit>
								<AppCardContent>
									<AppTypography variant="body1">
										Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus officiis perferendis
										consequuntur minus culpa delectus labore quo commodi dolore ullam animi, nulla tenetur ex
										minima accusamus sit, voluptas nobis vitae!
									</AppTypography>
								</AppCardContent>
							</AppCollapse>
						</AppCard>

						<AppCard
							variant="elevation"
							sx={{ minWidth: 345, maxWidth: 345, minHeight: 400, maxHeight: 'auto' }}
						>
							<AppCardHeader
								title="Header"
								avatar={<AppAvatar>OC</AppAvatar>}
								action={
									<AppIconButton>
										<MoreVert />
									</AppIconButton>
								}
							/>
							<AppCardMedia component="img" image="https://w.wallhaven.cc/full/zy/wallhaven-zyj28v.jpg" />
							<AppCardContent>
								<AppTypography variant="body1">
									Content Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus officiis
									perferendis consequuntur minus culpa delectus labore quo commodi dolore ullam animi, nulla
									tenetur ex minima accusamus sit, voluptas nobis vitae!
								</AppTypography>
							</AppCardContent>
							<AppCardActions>
								<AppButton color="error">Button</AppButton>
								<AppButton>Collapse</AppButton>
							</AppCardActions>
						</AppCard>

						<AppCard sx={{ minWidth: 345, minHeight: 400, maxHeight: 400 }}>Simple</AppCard>

						<AppCard variant="outlined" sx={{ minWidth: 345, minHeight: 400, maxHeight: 400 }}>
							Outlined
						</AppCard>

						<AppCard variant="elevation" sx={{ minWidth: 345, minHeight: 400, maxHeight: 400 }}>
							Elevation
						</AppCard>
					</AppBox>
				</AppPaper>
			</AppGrid>
		</AppGrid>
	)
}
