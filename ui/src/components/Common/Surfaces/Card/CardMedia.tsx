import { CardMedia, CardMediaProps } from '@mui/material'
import { FC, forwardRef } from 'react'

const AppCardMedia: FC<CardMediaProps> = forwardRef<HTMLDivElement, CardMediaProps>(({ ...rest }, ref) => {
	return <CardMedia ref={ref} {...rest} />
})

AppCardMedia.displayName = 'AppCardMedia'
export { AppCardMedia }
export default AppCardMedia
