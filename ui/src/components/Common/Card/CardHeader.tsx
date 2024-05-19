import { CardHeader, CardHeaderProps } from '@mui/material'
import { FC } from 'react'

const AppCardHeader: FC<CardHeaderProps> = (props) => {
	return <CardHeader {...props} />
}

AppCardHeader.displayName = 'AppCardHeader'
export { AppCardHeader }
export default AppCardHeader
