import Button, { ButtonProps } from '@mui/material/Button'
import { forwardRef } from 'react'

const AppButton = forwardRef<HTMLButtonElement, ButtonProps & { pills?: boolean }>((props, ref) => {
	const { children, pills, style, variant, ...rest } = props
	return (
		<Button
			ref={ref}
			style={{ borderRadius: pills ? '5rem' : undefined, ...style }}
			variant={variant}
			{...rest}
		>
			{children}
		</Button>
	)
})

AppButton.displayName = 'AppButton'
export default AppButton
