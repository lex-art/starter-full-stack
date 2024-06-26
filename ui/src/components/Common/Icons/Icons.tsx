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

const AppIconsTheme: ThemeOptions = {
	components: {
		MuiSvgIcon: {
			variants: [
				{
					props: { fontSize: 'large' },
					style: {
						width: '3.9rem',
						height: '3.9rem'
					}
				},
				{
					props: { fontSize: 'medium' },
					style: {
						width: '3rem',
						height: '3rem'
					}
				},
				{
					props: { fontSize: 'small' },
					style: {
						width: '2rem',
						height: '2rem'
					}
				},
				{
					props: { fontSize: 'smaller' },
					style: {
						width: '1.5rem',
						height: '1.5rem'
					}
				}
			]
		}
	}
}

const AppIcons = icons
export { AppIconsTheme }
export default AppIcons
