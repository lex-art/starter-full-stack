import { font } from '@/lib/design-tokens'
import { StepLabel, StepLabelProps, ThemeOptions } from '@mui/material'
import { forwardRef } from 'react'

const AppStepLabelThem: ThemeOptions = {
	components: {
		MuiStepLabel: {
			styleOverrides: {
				label: {
					fontSize: font.sizes.fontSizeMedium
				}
			}
		}
	}
}

const AppStepLabel = forwardRef<HTMLDivElement, StepLabelProps>((props, ref) => {
	const { children, ...rest } = props
	return (
		<StepLabel ref={ref} {...rest}>
			{children}
		</StepLabel>
	)
})
AppStepLabel.displayName = 'AppStepLabel'
export { AppStepLabel, AppStepLabelThem }
export default AppStepLabel
