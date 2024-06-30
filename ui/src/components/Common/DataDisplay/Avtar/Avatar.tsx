import { Avatar, AvatarProps } from '@mui/material'
import { FC, forwardRef } from 'react'

const AppAvatar: FC<AvatarProps> = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
	const { children, ...rest } = props
	return (
		<Avatar {...rest} ref={ref}>
			{children}{' '}
		</Avatar>
	)
})

AppAvatar.displayName = 'AppAvatar'
export default AppAvatar
