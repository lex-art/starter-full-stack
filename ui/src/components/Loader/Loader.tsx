import { FC } from 'react'
import { AppGrid } from '../Common'
import AppCircularLoader from '../Common/FeedBack/CircularLoader/CircularLoader'

interface ITBLoaderProps {
	isLoading?: boolean
}

export const TBLoader: FC<ITBLoaderProps> = ({ isLoading }) => {
	if (!isLoading) return null
	return (
		<AppGrid
			width="100vw"
			minHeight="100vh"
			height="100%"
			position="fixed"
			display="flex"
			justifyContent="center"
			alignItems="center"
			zIndex={9999}
			style={{
				backgroundColor: 'rgba(0,0,0,0.5)'
			}}
		>
			<AppCircularLoader color="secondary" size={80} />
		</AppGrid>
	)
}
