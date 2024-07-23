import { FC } from 'react'
import AppCircularLoader from '../Common/FeedBack/CircularLoader/CircularLoader'
import { Backdrop } from '@mui/material'

interface ITBLoaderProps {
	isLoading?: boolean
}

const AppLoader: FC<ITBLoaderProps> = ({ isLoading }) => {
	if (!isLoading) return null
	return (
		<Backdrop
			sx={{
				color: (theme) => (theme.palette.mode === 'dark' ? '#fff' : theme.palette.background.paper),
				zIndex: (theme) => theme.zIndex.drawer + 2
			}}
			open={isLoading}
			//onClick={handleClose}
		>
			<AppCircularLoader color="inherit" size={80} />
		</Backdrop>
	)
}

export { AppLoader }
export default AppLoader
