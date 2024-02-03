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

export const AppIconsTheme: ThemeOptions = {
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
						width: '3.5rem',
						height: '3.5rem'
					}
				},
				{
					props: { fontSize: 'small' },
					style: {
						width: '3.6rem',
						height: '3.6rem'
					}
				},
				{
					props: { fontSize: 'smaller' },
					style: {
						width: '2.2rem',
						height: '2.2rem'
					}
				}
			]
		}
	}
}

export const AppIcons = icons
export default AppIcons
