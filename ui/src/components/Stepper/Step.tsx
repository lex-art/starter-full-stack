import { Step, StepProps } from '@mui/material'
import React, { forwardRef } from 'react'

const AppStep = forwardRef<HTMLDivElement, StepProps>((props, ref) => {
	const { children, ...rest } = props
	return (
		<Step ref={ref} {...rest}>
			{children}
		</Step>
	)
})
AppStep.displayName = 'AppStep'
export default AppStep
