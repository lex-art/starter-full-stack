import { InputLabel } from '@mui/material'
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete'
import { forwardRef } from 'react'

export interface AppInputLabelProps extends Partial<AutocompleteRenderInputParams> {
	disabled?: boolean
	disableAnimation?: boolean
	shrink?: boolean
	color?: 'error' | 'info' | 'primary' | 'secondary' | 'success' | 'warning'
	label?: string
	error?: boolean
	required?: boolean
	htmlFor?: string
}

/**
 * AppInputField
 * @param disabled <boolean>: If `true`, the component is disabled.
 * @param disableAnimation <boolean>: If `true`, the component's animation is disabled.
 * @param shrink <boolean>: If `true`, the component will be smaller than usual.
 * @param color <'error' | 'info' | 'primary' | 'secondary' | 'success' | 'warning'>: Color of the label.
 * @param label <string>: The label to be disaplayed.
 * @param error <boolean>: If `true`, display the label as an error label.
 * @param required <boolean>: If `true`, the component's linked input is required (in a form).
 * @param htmlFor <string>: The ID of the input that will be linked to the label.
 */
const AppInputLabel = forwardRef<HTMLLabelElement, AppInputLabelProps>((props, ref) => {
	const { disabled, disableAnimation, shrink, color, label, error, required, htmlFor } = props
	return (
		<InputLabel
			ref={ref}
			disabled={disabled}
			disableAnimation={disableAnimation}
			shrink={shrink}
			color={color}
			error={error}
			required={required}
			htmlFor={htmlFor}
		>
			{label}
		</InputLabel>
	)
})

AppInputLabel.displayName = 'AppInputLabel'
export default AppInputLabel
