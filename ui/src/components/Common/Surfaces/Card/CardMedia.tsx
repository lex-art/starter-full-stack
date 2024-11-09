import { CardMedia, CardMediaProps } from '@mui/material'
import { FC, forwardRef } from 'react'

const AppCardMedia = forwardRef<HTMLDivElement, CardMediaProps>(({ ...rest }, ref) => {
	return <CardMedia ref={ref} {...rest} />
})

AppCardMedia.displayName = 'AppCardMedia'
export default AppCardMedia
