import { CircularProgressProps } from '@mui/material'
import Button, { ButtonProps } from '@mui/material/Button'
import { forwardRef } from 'react'
import AppCircularProgress from '../../FeedBack/CircularProgress/CircularProgress'

const AppButton = forwardRef<
	HTMLButtonElement,
	ButtonProps & {
		pills?: boolean
		loading?: boolean
		colorCircle?: CircularProgressProps['color']
	}
>((props, ref) => {
	const {
		children,
		pills,
		style,
		variant,
		loading,
		colorCircle = 'secondary',
		disabled,
		...rest
	} = props
	return (
		<Button
			ref={ref}
			style={{
				borderRadius: pills ? '5rem' : undefined,
				...style
			}}
			variant={variant}
			endIcon={
				loading ? (
					<AppCircularProgress
						size={25}
						color={colorCircle}
					/>
				) : null
			}
			{...rest}
		>
			{children}
		</Button>
	)
})

AppButton.displayName = 'AppButton'
export default AppButton
