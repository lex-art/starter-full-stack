import { font } from '@/lib/designTokens'
import { StepLabel, StepLabelProps, ThemeOptions } from '@mui/material'
import { forwardRef } from 'react'

const AppStepLabel = forwardRef<HTMLDivElement, StepLabelProps>((props, ref) => {
	const { children, ...rest } = props
	return (
		<StepLabel ref={ref} {...rest}>
			{children}
		</StepLabel>
	)
})
AppStepLabel.displayName = 'AppStepLabel'
export default AppStepLabel
