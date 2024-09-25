import { font } from '@/lib/designTokens'
import { ThemeOptions } from '@mui/material'
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import { FC } from 'react'

const AppFormControlLabelTheme: ThemeOptions = {
	components: {
		MuiFormControlLabel: {
			styleOverrides: {
				label: {
					fontSize: font.sizes.fontSizeLarge - 3
				}
			}
		},
		MuiFormLabel: {
			styleOverrides: {
				root: {
					fontSize: font.sizes.fontSizeLarge - 3
				}
			}
		}
	}
}
const AppFormControlLabel: FC<FormControlLabelProps> = (props) => {
	return <FormControlLabel {...props} />
}

export { AppFormControlLabel, AppFormControlLabelTheme }
AppFormControlLabel.displayName = 'AppFormControlLabel'
export default AppFormControlLabel
