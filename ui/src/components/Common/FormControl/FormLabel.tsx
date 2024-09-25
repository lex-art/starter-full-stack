import { font } from '@/lib/designTokens'
import { ThemeOptions } from '@mui/material'
import FormLabel, { FormLabelProps } from '@mui/material/FormLabel'
import { FC } from 'react'

const AppFormLabelTheme: ThemeOptions = {
	components: {
		MuiFormLabel: {
			styleOverrides: {
				root: {
					fontSize: font.sizes.fontSizeMedium
				}
			}
		}
	}
}

const AppFormLabel: FC<FormLabelProps> = ({ children, ...props }) => {
	return <FormLabel {...props}>{children}</FormLabel>
}

export { AppFormLabel, AppFormLabelTheme }
AppFormLabel.displayName = 'AppFormLabel'
export default AppFormLabel
