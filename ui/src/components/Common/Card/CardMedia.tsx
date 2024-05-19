import { CardMedia, CardMediaProps } from '@mui/material'
import { FC } from 'react'

const AppCardMedia: FC<CardMediaProps> = ({ children, ...rest }) => {
	return <CardMedia {...rest}>{children}</CardMedia>
}

AppCardMedia.displayName = 'AppCardMedia'
export { AppCardMedia }
export default AppCardMedia
