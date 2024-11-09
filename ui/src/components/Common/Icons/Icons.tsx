import * as icons from '@mui/icons-material'
import { ThemeOptions } from '@mui/material/styles'

declare module '@mui/material/SvgIcon' {
	interface SvgIconPropsSizeOverrides {
		smaller: true
		small: true
		medium: true
		large: true
	}
}


const AppIcons = icons
export default AppIcons
