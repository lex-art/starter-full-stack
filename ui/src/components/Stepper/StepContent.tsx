import { Collapse } from '@mui/material'
import { forwardRef } from 'react'
import AppBox from '../Common/Layout/Box'

interface StepContentProps {
	children?: React.ReactNode[] | React.ReactNode
	currentStep: boolean
}
/**
 * AppStepContent
 * is only designed for use with the Horizontal stepper.
 */
const AppStepContent = forwardRef<HTMLDivElement, StepContentProps>((props, ref) => {
	const { children, currentStep } = props
	return (
		<Collapse ref={ref} in={currentStep}>
			<AppBox width="100%">{children}</AppBox>
		</Collapse>
	)
})

AppStepContent.displayName = 'AppStepContent'
export default AppStepContent
