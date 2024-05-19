import { Divider, DividerProps, ThemeOptions } from '@mui/material'
import { FC } from 'react'

const AppDividerTheme: ThemeOptions = {
	components: {
		MuiDivider: {
			styleOverrides: {
				root: {
					'::before': {
						width: '3%'
					}
				}
			}
		}
	}
}

interface AppDividerProps extends DividerProps {
	marginY?: string
}

const AppDivider: FC<AppDividerProps> = ({ marginY, ...props }) => {
	return (
		<Divider
			sx={{
				margin: marginY ? `${marginY} 0` : undefined
			}}
			{...props}
		/>
	)
}

AppDivider.displayName = 'AppDivider'
export { AppDivider, AppDividerTheme }
export default AppDivider
