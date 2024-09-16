import { font } from '@/lib/design-tokens'
import { ThemeOptions, colors } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import { FC, ReactElement, ReactNode, forwardRef } from 'react'

declare module '@mui/material/Tooltip' {
	interface TooltipProps {
		variant?: 'light' | 'bootstrap'
	}
}

const AppTooltipTheme: ThemeOptions = {
	components: {
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					fontSize: font.sizes.fontSizeMedium
				}
			},
			variants: [
				{
					props: { variant: 'light' },
					style: {
						'&.MuiTooltip-tooltip': {
							backgroundColor: 'blue',
							color: 'rgba(0, 0, 0, 0.87)',
							fontSize: font.sizes.fontSizeMedium,
							'&.MuiTooltip-arrow': {
								backgroundColor: 'red'
							}
						}
					}
				}
			]
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
	variant?: 'light' | 'bootstrap'
}
const AppTooltip: FC<AppTooltipProps> = forwardRef<HTMLDivElement, AppTooltipProps>(
	({ children, variant, ...rest }, ref) => {
		return (
			<Tooltip
				ref={ref}
				hidden={false}
				arrow={true}
				slotProps={{
					arrow: {
						sx: {
							...(variant === 'light' && {
								color: colors.grey[300]
							}),
							...(variant === 'bootstrap' && {
								color: colors.common.black
							})
						}
					},
					tooltip: {
						sx: {
							...(variant === 'light' && {
								backgroundColor: colors.grey[300],
								color: 'rgba(0, 0, 0, 0.87)',
								fontSize: font.sizes.fontSizeMedium
							}),
							...(variant === 'bootstrap' && {
								backgroundColor: colors.common.black,
								color: colors.common.white,
								fontSize: font.sizes.fontSizeMedium
							})
						}
					}
				}}
				{...rest}
			>
				{children}
			</Tooltip>
		)
	}
)

export { AppTooltip, AppTooltipTheme }

AppTooltip.displayName = 'AppTooltip'
export default AppTooltip
