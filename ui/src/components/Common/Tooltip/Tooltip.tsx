import { FC, ReactElement, ReactNode } from 'react'
import { ThemeOptions } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'

const AppTooltipTheme: ThemeOptions = {
	components: {
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					fontSize: '1.6rem'
				}
			}
		}
	}
}

interface AppTooltipProps {
	enterDelay?: number
	enterNextDelay?: number
	enterTouchDelay?: number
	followCursor?: boolean
	leaveDelay?: number
	leaveTouchDelay?: number
	onClose?: (event: React.SyntheticEvent | Event) => void
	onOpen?: (event: React.SyntheticEvent) => void
	open?: boolean
	placement?:
		| 'bottom-end'
		| 'bottom-start'
		| 'bottom'
		| 'left-end'
		| 'left-start'
		| 'left'
		| 'right-end'
		| 'right-start'
		| 'right'
		| 'top-end'
		| 'top-start'
		| 'top'
	title: ReactNode
	disableInteractive?: boolean
	children: ReactElement
}
const AppTooltip: FC<AppTooltipProps> = ({ children, ...props }) => {
	return (
		<Tooltip hidden={false} arrow={true} {...props}>
			{children}
		</Tooltip>
	)
}

export { AppTooltip, AppTooltipTheme }

AppTooltip.displayName = 'AppTooltip'
export default AppTooltip
