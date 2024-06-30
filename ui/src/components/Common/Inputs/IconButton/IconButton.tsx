'use client'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { ReactNode, forwardRef, useState } from 'react'

interface AppIconButtonProps extends IconButtonProps {
	restingIcon?: ReactNode
	hoverIcon?: ReactNode
}

/**
 * IconButton with hover behaviour
 * @param restingIcon <React.ReactNode>: Icon shown in resting state, if null or hoverIcon is null, icon will be taken from children
 * @param hoverIcon <React.ReactNode>: Icon shown in hover state, if null or restingIcon is null, icon will be taken from children
 * @returns component
 */
const AppIconButton = forwardRef<HTMLButtonElement, AppIconButtonProps>(
	({ children, hoverIcon, restingIcon, onMouseEnter, onMouseLeave, ...rest }, ref) => {
		const [hover, setHover] = useState(false)
		const hoverBehaviourOn = restingIcon && hoverIcon
		const isHoverIcon: ReactNode = hover ? hoverIcon : restingIcon

		return (
			<IconButton
				onMouseEnter={hoverBehaviourOn ? () => setHover(true) : onMouseEnter}
				onMouseLeave={hoverBehaviourOn ? () => setHover(false) : onMouseLeave}
				ref={ref}
				{...rest}
			>
				{hoverBehaviourOn ? isHoverIcon : children}
			</IconButton>
		)
	}
)

AppIconButton.displayName = 'TikalBoxIconButton'
export { AppIconButton }
export default AppIconButton
