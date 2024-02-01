'use client'
import { Avatar, Skeleton, Typography, useMediaQuery } from '@mui/material'
import { FC } from 'react'
import styles from './styles.module.css'
import { AppGrid } from '../Grid/Grid'

export const SkeletonApp: FC = () => {
	const isMobile: boolean = useMediaQuery('(min-width: 960px)')
	return (
		<AppGrid
			minHeight="100vh"
			height="100%"
			position="relative"
			zIndex={0}
			display="grid"
			gridTemplateColumns={isMobile ? '25rem 1fr' : '1fr'}
			gridTemplateAreas={isMobile ? '"aside header" "aside main"' : '"header" "main"'}
			gridTemplateRows="7rem 1fr"
		>
			{isMobile ? (
				<AppGrid sx={{ bgcolor: 'grey.800' }} className={styles.asideSkeleton}>
					<Skeleton sx={{ bgcolor: 'grey.400' }} variant="rectangular" width="100%">
						<div style={{ paddingTop: '7rem' }} />
					</Skeleton>
					<Skeleton
						variant="rectangular"
						animation="wave"
						sx={{ bgcolor: 'grey.400', transform: 'scale(1,1)', margin: '1rem 0' }}
						width="100%"
					>
						<Typography variant="h2">.</Typography>
					</Skeleton>

					<Skeleton
						variant="rectangular"
						animation="pulse"
						sx={{ bgcolor: 'grey.400', transform: 'scale(1,1)', margin: '1rem 0' }}
						width="100%"
					>
						<Typography variant="h2">.</Typography>
					</Skeleton>

					<Skeleton
						variant="rectangular"
						animation="wave"
						sx={{ bgcolor: 'grey.400', transform: 'scale(1,1)', margin: '1rem 0' }}
						width="100%"
					>
						<Typography variant="h2">.</Typography>
					</Skeleton>
					<Skeleton
						variant="rectangular"
						animation="pulse"
						sx={{ bgcolor: 'grey.400', transform: 'scale(1,1)', margin: '1rem 0' }}
						width="100%"
					>
						<Typography variant="h2">.</Typography>
					</Skeleton>
				</AppGrid>
			) : null}
			<AppGrid sx={{ bgcolor: 'grey.700' }} className={styles.headerSkeleton}>
				<Skeleton variant="circular" sx={{ bgcolor: 'grey.400' }} animation="wave" width={50} height={50}>
					{' '}
					<Avatar />
				</Skeleton>
				<Skeleton variant="circular" sx={{ bgcolor: 'grey.400' }} animation="wave" width={50} height={50}>
					{' '}
					<Avatar />
				</Skeleton>
			</AppGrid>
			<AppGrid sx={{ bgcolor: 'grey.200' }} height="100%" className={styles.main}>
				<AppGrid item width="100%" height="100%" flexDirection="column" className={styles.mainContainer}>
					<Skeleton
						sx={{
							bgcolor: 'grey.400'
						}}
						animation="wave"
						variant="rectangular"
						width="100%"
						height="100%"
					/>
				</AppGrid>
			</AppGrid>
		</AppGrid>
	)
}
