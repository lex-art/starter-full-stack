import { CardContent, CardContentProps } from '@mui/material'
import { FC } from 'react'

const AppCardContent: FC<CardContentProps> = ({ children, ...rest }) => {
	return <CardContent {...rest}>{children}</CardContent>
}

AppCardContent.displayName = 'AppCardContent'
export { AppCardContent }
export default AppCardContent
