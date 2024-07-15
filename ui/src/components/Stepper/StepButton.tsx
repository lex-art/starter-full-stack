import { StepButtonProps, StepButton } from '@mui/material'
import { forwardRef } from 'react'

const AppStepButton = forwardRef<HTMLButtonElement, StepButtonProps>((props, ref) => {
	const { children, ...rest } = props
	return (
		<StepButton {...rest} ref={ref}>
			{children}
		</StepButton>
	)
})

AppStepButton.displayName = 'AppStepButton'
export default AppStepButton
