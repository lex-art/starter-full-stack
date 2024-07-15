import { Stepper, StepperProps } from '@mui/material'
import { forwardRef } from 'react'

const AppStepper = forwardRef<HTMLDivElement, StepperProps>((props, ref) => {
	const { children, ...rest } = props
	return (
		<Stepper {...rest} ref={ref}>
			{children}
		</Stepper>
	)
})

AppStepper.displayName = 'AppStepper'
export default AppStepper
