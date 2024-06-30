import { CardHeader, CardHeaderProps } from '@mui/material'
import { FC, forwardRef } from 'react'

const AppCardHeader: FC<CardHeaderProps> = forwardRef<HTMLDivElement, CardHeaderProps>((props, ref) => {
	return <CardHeader ref={ref} {...props} />
})

AppCardHeader.displayName = 'AppCardHeader'
export { AppCardHeader }
export default AppCardHeader
