import { Divider, DividerProps, ThemeOptions } from '@mui/material'
import { FC } from 'react'


interface AppDividerProps extends DividerProps {
	marginY?: string
}

const AppDivider: FC<AppDividerProps> = ({ marginY, children, ...props }) => {
	return (
		<Divider
			sx={{
				margin: marginY ? `${marginY} 0` : undefined
			}}
			{...props}
		>
			{children}
		</Divider>
	)
}

AppDivider.displayName = 'AppDivider'
export default AppDivider
