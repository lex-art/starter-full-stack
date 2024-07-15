import { StepContent, StepContentProps } from '@mui/material'
import { forwardRef } from 'react'

/**
 * AppStepContentVertical
 * is only designed for use with the vertical stepper.
 */
const AppStepContentVertical = forwardRef<HTMLDivElement, StepContentProps>((props, ref) => {
	const { children, ...rest } = props
	return (
		<StepContent {...rest} ref={ref}>
			{children}
		</StepContent>
	)
})

AppStepContentVertical.displayName = 'AppStepContentVertical'
export default AppStepContentVertical
