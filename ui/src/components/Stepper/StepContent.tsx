import { StepContent, StepContentProps } from '@mui/material'
import { forwardRef } from 'react'

const AppStepContent = forwardRef<HTMLDivElement, StepContentProps>((props, ref) => {
	const { children, ...rest } = props
	return (
		<StepContent {...rest} ref={ref}>
			{children}
		</StepContent>
	)
})

AppStepContent.displayName = 'AppStepContent'
export default AppStepContent
